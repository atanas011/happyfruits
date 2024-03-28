import { ErrorHandler } from '../utils/errorHandler.js'

// error-handling middleware takes 4 arguments, even if you don’t need to use the next object
export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    // err.message = err.message || 'Internal Server Error'

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            message: err.message,
            error: err,
            stack: err.stack
        })
    }

    // shell script on Render.com doesn't take capital letters (e.g. SET or PRODUCTION),
    // and always runs in production mode
    if (process.env.NODE_ENV === 'production') {
        let error = { ...err } // a copy of err ???
        error.message = err.message

        // e.g. handles sent req with wrong object id
        if (err.name === 'CastError') { // get error name and path from Postman res body in dev mode
            const msg = `Resource not found. Invalid ${err.path}`
            error = new ErrorHandler(msg, 400)
        }

        // e.g. handles sent create req w/o required params w/o default values in body json
        if (err.name === 'ValidationError') {
            const msg = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(msg, 400)
        }

        res.status(error.statusCode).json({ message: error.message || 'Internal Server Error' })
    }
    // if a res has been sent, the routing doesn't continue, and next() is not called
}
