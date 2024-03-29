import catchAsyncErrors from '../middleware/catchAsyncErrors.js'
import { ErrorHandler } from '../utils/errorHandler.js'
import Product from '../models/product.js'
import Order from '../models/order.js'

export const createOrder = catchAsyncErrors(async (req, res) => {
    const {
        orderItems,
        itemsPrice,
        tax,
        shippingPrice,
        totalPrice,
        paymentInfo,
        shippingInfo
    } = req.body
    const order = await Order.create({
        orderItems,
        itemsPrice,
        tax,
        shippingPrice,
        totalPrice,
        paymentInfo,
        shippingInfo,
        paidAt: Date.now(),
        user: req.user.id
    })
    res.status(201).json({ order })
})

export const getOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (!order) return next(new ErrorHandler('Order not found', 404))
    res.status(200).json({ order })
})

export const getMyOrders = catchAsyncErrors(async (req, res) => {
    const orders = await Order.find({ user: req.user.id })
    res.status(200).json({
        count: orders.length,
        orders
    })
})

// ADMIN ROUTES ===============================================================

export const getAllOrders = catchAsyncErrors(async (req, res) => {
    const orders = await Order.find()
    let totalAmount = 0
    orders.forEach(order => {
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        count: orders.length,
        totalAmount,
        orders
    })
})

export const updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (order.orderStatus === 'Delivered') return next(new ErrorHandler('Order already delivered', 400))
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })
    order.orderStatus = req.body.status
    order.deliveredAt = Date.now()
    await order.save()
    res.status(200).json({ order })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id)
    product.stock -= quantity
    await product.save({ validateBeforeSave: false })
}

export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    if (!order) return next(new ErrorHandler('Order not found', 404))
    await order.deleteOne()
    res.sendStatus(200)
})
