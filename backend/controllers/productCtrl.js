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

export const getProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) return next(new ErrorHandler('Product not found', 404))
    res.status(200).json({ product })
})

// ADMIN ROUTES ===============================================================

export const addProduct = catchAsyncErrors(async (req, res) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body)
    res.status(201).json({ product })
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

// REVIEW ROUTES ==============================================================

export const createReview = catchAsyncErrors(async (req, res) => {
    const { rating, comment, productId } = req.body
    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId)
    const isReviewed = product.reviews.find(review => review.user.toString() === req.user.id.toString())

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user.id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }
    product.ratings = product.reviews.reduce((acc, prod) => prod.rating + acc, 0) / product.reviews.length
    await product.save({ validateBeforeSave: false })
    res.status(201).json({ review })
})

export const getReviews = catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req.query.id)
    res.status(200).json({ reviews: product.reviews })
})

export const deleteReview = catchAsyncErrors(async (req, res) => {
    const product = await Product.findById(req.query.productId)
    const reviews = product.reviews.filter(review => review.id.toString() !== req.query.id.toString())
    const numOfReviews = reviews.length
    const ratings = product.reviews.reduce((acc, prod) => prod.rating + acc, 0) / numOfReviews
    await Product.findByIdAndUpdate(req.query.productId, { reviews, numOfReviews, ratings }, { new: true })
    res.sendStatus(200)
})
