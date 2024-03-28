import Product from '../models/product.js'

export const getProducts = async (req, res) => {
    const products = await Product.find()
    res.status(200).json({
        count: products.length,
        products
    })
}

export const addProduct = async (req, res) => {
    const product = await Product.create(req.body)
    res.status(201).json({ product })
}

export const getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) return res.sendStatus(404)
    res.status(200).json({ product })
}

export const updateProduct = async (req, res) => {
    let product = await Product.findById(req.params.id)
    if (!product) return res.sendStatus(404)
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ product })
}

export const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (!product) return res.sendStatus(404)
    await product.deleteOne()
    res.sendStatus(200)
}
