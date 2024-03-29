import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            product: {
                type: Schema.ObjectId,
                required: true,
                ref: 'Product'
            }
        }
    ],
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    tax: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    paidAt: {
        type: Date
    },
    user: {
        type: Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deliveredAt: {
        type: Date
    }
})

export default model('Order', orderSchema)
