import { Schema, model } from 'mongoose'

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name'],
        maxLength: [100, 'Product name cannot exceed 100 characters'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
        maxLength: [5, 'Product price cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please provide product description'],
    },
    ratings: {
        type: Number,
        default: 0.0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                'Apple',
                'Apricot',
                'Pear',
                'Plum',
                'Walnut'
            ],
            message: 'Please select correct category for product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please provide product seller'],
    },
    stock: {
        type: Number,
        required: [true, 'Please provide product stock'],
        maxLength: [5, 'Product stock cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default model('Product', productSchema)
