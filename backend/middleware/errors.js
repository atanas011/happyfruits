import { ErrorHandler } from '../utils/errorHandler.js'

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            message: err.message,
            error: err,
            stack: err.stack
        })
    }

    if (process.env.NODE_ENV === 'production') {
        let error = { ...err }
        error.message = err.message

        // e.g. handles sent req with wrong object id
        if (err.name === 'CastError') {
            const msg = `Resource not found. Invalid ${err.path}`
            error = new ErrorHandler(msg, 400)
        }

        // e.g. handles sent create req w/o required params w/o default values in body json
        if (err.name === 'ValidationError') {
            const msg = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(msg, 400)
        }

        // handles duplicate key error (e.g. registration with same email)
        if (err.code === 11000) {
            const msg = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(msg, 409)
        }

        if (err.name === 'JsonWebTokenError') {
            const msg = 'Invalid token'
            error = new ErrorHandler(msg, 401)
        }

        if (err.name === 'TokenExpiredError') {
            const msg = 'Session has expired'
            error = new ErrorHandler(msg, 401)
        }

        res.status(error.statusCode).json({ message: error.message || 'Internal Server Error' })
    }
}
