import express from 'express'

import { productRouter } from './routes/productRoutes.js'
import errorMiddleware from './middleware/errors.js'

export const app = express()

app.use(express.json())

app.use('/api', productRouter)

app.use(errorMiddleware)
