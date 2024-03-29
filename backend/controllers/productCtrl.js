import Product from '../models/product.js'
import { APIFeatures } from '../utils/apiFeatures.js'
import { ErrorHandler } from '../utils/errorHandler.js'
import catchAsyncErrors from '../middleware/catchAsyncErrors.js'

export const getProducts = catchAsyncErrors(async (req, res) => {
    const count = await Product.countDocuments()
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .paginate(count)
    const products = await apiFeatures.query
    res.status(200).json({
        tempCount: products.length,
        count,
        products
    })
})

export const addProduct = catchAsyncErrors(async (req, res) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body)
    res.status(201).json({ product })
})

export const getProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) return next(new ErrorHandler('Product not found', 404))
    res.status(200).json({ product })
})

export const updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)
    if (!product) return next(new ErrorHandler('Product not found', 404))
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ product })
})

export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) return next(new ErrorHandler('Product not found', 404))
    await product.deleteOne()
    res.sendStatus(200)
})
