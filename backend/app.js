import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import express from 'express'

import { productRouter } from './routes/productRoutes.js'
import { authRouter } from './routes/authRoutes.js'
import { orderRouter } from './routes/orderRoutes.js'
import errorMiddleware from './middleware/errors.js'

export const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(fileUpload())

app.use('/api', productRouter)
app.use('/api', authRouter)
app.use('/api', orderRouter)

app.use(errorMiddleware)
