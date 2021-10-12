import { Router } from 'express'
import controller from './authController'
// import { create, getAll } from '../middlewares/middlewares'

const router = Router()
router.get('/user', controller.getUser)
router.post('/login', controller.login)
router.post('/registration', controller.registration)

export default router
