import products from '../data/products.json' assert {type: 'json'}
import Product from '../models/product.js'
import { connectDB } from '../db.js'

connectDB();

(async () => {
    try {
        await Product.deleteMany()
        console.log('Products deleted')
        await Product.insertMany(products)
        console.log('Database seeded')
    } catch (err) {
        console.log(err.message)
    }
    process.exit()
})()
