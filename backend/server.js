import { app } from './app.js'
import { connectDB } from './db.js'

const PORT = process.env.PORT

connectDB()

app.listen(PORT, console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`))
