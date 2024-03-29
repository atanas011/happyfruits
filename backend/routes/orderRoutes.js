import express from 'express'
import {
    createOrder,
    getOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} from '../controllers/orderCtrl.js'
import { isAuthenticated, authorizeRole } from '../middleware/auth.js'

export const orderRouter = express.Router()

orderRouter.post('/order/new', isAuthenticated, createOrder)
orderRouter.get('/order/:id', isAuthenticated, getOrder)
orderRouter.get('/orders/user', isAuthenticated, getMyOrders)

orderRouter.get('/admin/orders', isAuthenticated, authorizeRole, getAllOrders)
orderRouter.put('/admin/order/:id', isAuthenticated, authorizeRole, updateOrderStatus)
orderRouter.delete('/admin/order/:id', isAuthenticated, authorizeRole, deleteOrder)
