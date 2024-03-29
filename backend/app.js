import cookieParser from 'cookie-parser'
import express from 'express'

import { productRouter } from './routes/productRoutes.js'
import { authRouter } from './routes/authRoutes.js'
import errorMiddleware from './middleware/errors.js'

export const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api', productRouter)
app.use('/api', authRouter)

app.use(errorMiddleware)
