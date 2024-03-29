import jwt from 'jsonwebtoken'

import { ErrorHandler } from '../utils/errorHandler.js'
import catchAsyncErrors from './catchAsyncErrors.js'
import User from '../models/user.js'

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies
    if (!token) return next(new ErrorHandler('Login first to access this resource', 401))
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id) // id is stored in token
    next()
})

export const authorizeRole = (req, res, next) => {
    req.user.role === 'Admin' ? next() : next(new ErrorHandler('Access restricted', 403)) // return
}
