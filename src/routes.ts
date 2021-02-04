import { Router } from 'express'
import UserController from './app/controllers/UserController'
import AuthController from './app/controllers/AuthController'
import authMiddleware from './app/middlewares/authMiddleware'

const routes = Router()

routes.post('/users',  UserController.store)
routes.get('/users', authMiddleware, UserController.index)
routes.post('/login', AuthController.authenticate)



export default routes