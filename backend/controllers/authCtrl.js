import catchAsyncErrors from '../middleware/catchAsyncErrors.js'
import { ErrorHandler } from '../utils/errorHandler.js'
import { sendToken } from '../utils/jwtToken.js'
import User from '../models/user.js'

export const register = catchAsyncErrors(async (req, res) => {
    const { name, email, password } = req.body
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'avatars/',
            url: 'https://res.cloudinary.com/.jpg'
        }
    })
    sendToken(user, 201, res)
    // const token = user.getJwtToken()
    // res.status(201).json({ token, user })
})

// login user and assign a token
export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) return next(new ErrorHandler('Please provide email and password', 400))
    const user = await User.findOne({ email }).select('+password')
    if (!user) return next(new ErrorHandler('User not found', 404))
    const isMatch = await user.comparePassword(password)
    if (!isMatch) return next(new ErrorHandler('Invalid password', 401))
    sendToken(user, 200, res)
    // const token = user.getJwtToken()
    // res.status(200).json({ token })
})
