import { app } from './app.js'
import { connectDB } from './db.js'

const PORT = process.env.PORT

process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to uncaught exception')
    process.exit(1)
})
// uncaught exception
// console.log(a)

connectDB()

const server = app.listen(PORT, console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`))

// e.g. handles wrong conn string
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to unhandled promise rejection')
    server.close(() =>
        process.exit(1)
    )
})
