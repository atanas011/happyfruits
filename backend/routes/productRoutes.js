import express from 'express'

import { getProducts } from '../controllers/productCtrl.js'

export const productRouter = express.Router()

productRouter.get('/products', getProducts)
