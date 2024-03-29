import { Schema, model } from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        maxLength: [30, 'Name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minLength: [3, 'Password must be at least 3 characters long'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPassToken: String,
    resetPassTokenExpire: Date
})

// encrypt password while registering
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next()
    this.password = await bcrypt.hash(this.password, 10)
})

// compare password for login
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// generate JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

// generate password reset token
userSchema.methods.getResetPwdToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPassToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetPassTokenExpire = Date.now() + 30 * 60 * 1000
    return resetToken
}

export default model('User', userSchema)
