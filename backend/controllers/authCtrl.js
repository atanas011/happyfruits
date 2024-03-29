import crypto from 'crypto'

import catchAsyncErrors from '../middleware/catchAsyncErrors.js'
import { ErrorHandler } from '../utils/errorHandler.js'
import { sendEmail } from '../utils/sendEmail.js'
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
})

export const getMyProfile = catchAsyncErrors(async (req, res) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({ user })
})

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) return next(new ErrorHandler('Invalid old password', 401))
    user.password = req.body.password
    await user.save()
    sendToken(user, 200, res)
})

export const updateProfile = catchAsyncErrors(async (req, res) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    // TODO: Update avatar 

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, { new: true })
    res.status(200).json({ user })
})

// logout user and clear the cookie
export const logout = catchAsyncErrors(async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        // secure: true,
        httpOnly: true
    })
    res.status(200).json({ message: 'Logged out' })
})

export const forgotPassEmail = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(new ErrorHandler('User not found', 404))
    const resetToken = user.getResetPwdToken()
    await user.save({ validateBeforeSave: false })

    // create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/password/reset/${resetToken}`
    const message = `Your password reset token is:\n\n${resetUrl}\n\nIf you did not request this email, please ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message
        })
        res.status(200).json({ message: `Email sent to: ${user.email}` })
    } catch (err) {
        user.resetPassToken = undefined
        user.resetPassTokenExpire = undefined
        await user.save({ validateBeforeSave: false })
        next(new ErrorHandler(err.message, 500)) // return
    }
})

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    const resetPassToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPassToken: resetPassToken,
        resetPassTokenExpire: { $gt: Date.now() }
    })
    if (!user) return next(new ErrorHandler('Token is invalid or has expired', 401))
    if (req.body.password !== req.body.confirmPassword) return next(new ErrorHandler('Password does not match', 401))
    user.password = req.body.password
    user.resetPassToken = undefined
    user.resetPassTokenExpire = undefined
    await user.save()
    sendToken(user, 200, res)
})

// ADMIN ROUTES ===============================================================

export const getUsers = catchAsyncErrors(async (req, res) => {
    const users = await User.find()
    res.status(200).json({
        count: users.length,
        users
    })
})

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) return next(new ErrorHandler('User not found', 404))
    res.status(200).json({ user })
})

export const updateUser = catchAsyncErrors(async (req, res) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, { new: true })
    res.status(200).json({ user })
})

export const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    if (!user) return next(new ErrorHandler('User not found', 404))

    // TODO: Remove avatar from cloudinary

    await user.deleteOne()
    res.sendStatus(200)
})
