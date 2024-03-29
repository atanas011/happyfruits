import express from 'express'

import {
    register,
    login,
    logout,
    forgotPassEmail,
    resetPassword
} from '../controllers/authCtrl.js'

export const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/logout', logout)

authRouter.post('/password/reset', forgotPassEmail)
authRouter.put('/password/reset/:token', resetPassword)
