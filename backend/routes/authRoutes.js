import express from 'express'

import {
    register,
    login,
    logout,
    forgotPassEmail,
    resetPassword,
    getMyProfile,
    updatePassword,
    updateProfile,
    getUsers,
    getUserDetails,
    updateUser,
    deleteUser
} from '../controllers/authCtrl.js'
import { isAuthenticated, authorizeRole } from '../middleware/auth.js'

export const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/logout', logout)

authRouter.post('/password/reset', forgotPassEmail)
authRouter.put('/password/reset/:token', resetPassword)

authRouter.get('/profile', isAuthenticated, getMyProfile)
authRouter.put('/profile/update', isAuthenticated, updateProfile)
authRouter.put('/password/update', isAuthenticated, updatePassword)

authRouter.get('/admin/users', isAuthenticated, authorizeRole, getUsers)
authRouter.get('/admin/user/:id', isAuthenticated, authorizeRole, getUserDetails)
authRouter.put('/admin/user/:id', isAuthenticated, authorizeRole, updateUser)
authRouter.delete('/admin/user/:id', isAuthenticated, authorizeRole, deleteUser)
