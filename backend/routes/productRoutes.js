import express from 'express'

import {
    getProducts,
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productCtrl.js'

export const productRouter = express.Router()

productRouter.get('/products', getProducts)
productRouter.get('/product/:id', getProduct)
productRouter.post('/admin/product/new', addProduct)
productRouter.put('/admin/product/:id', updateProduct)
productRouter.delete('/admin/product/:id', deleteProduct)
