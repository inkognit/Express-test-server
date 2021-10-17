import express from 'express'
import { login, userCreate } from '../queries/user'
// import controller from './authController'
import { get, post } from './httpMethods'
const router = express.Router()

router.use(get('/', 'accountPage/mainPage.html'))
router.use(get('/about.html', 'accountPage/about.html'))
router.use(get('/auth.html', 'accountPage/auth.html'))
router.use(get('/registration.html', 'accountPage/registration.html'))
router.use(get('/user.html', 'accountPage/user.html'))
router.use(post('/create_user', userCreate))
router.use(post('/login', login))

// router.get('/user', controller.getUser)
// router.get('/login', controller.login)
// router.post('/registration', controller.registration)

export default router
