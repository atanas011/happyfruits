import express from 'express'

import { productRouter } from './routes/productRoutes.js'

export const app = express()

app.use(express.json())

app.use('/api', productRouter)
