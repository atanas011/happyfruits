import express from 'express'

import {
    getProducts,
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productCtrl.js'
import { isAuthenticated, authorizeRole } from '../middleware/auth.js'

export const productRouter = express.Router()

productRouter.get('/products', getProducts)
productRouter.get('/product/:id', getProduct)
productRouter.post('/admin/product/new', isAuthenticated, authorizeRole, addProduct)
productRouter.put('/admin/product/:id', isAuthenticated, authorizeRole, updateProduct)
productRouter.delete('/admin/product/:id', isAuthenticated, authorizeRole, deleteProduct)
