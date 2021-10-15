import express from 'express'
import { userCreate } from '../queries/user'
// import controller from './authController'
// import { get, post } from '../controllers/httpMethods'
import { get } from '../controllers/httpMethods'
const router = express.Router()

router.use(get('/', 'accountPage/mainPage.html'))
router.use(get('/about.html', 'accountPage/about.html'))
router.use(get('/auth.html', 'accountPage/auth.html'))
router.use(get('/registration.html', 'accountPage/registration.html'))
router.use(get('/user.html', 'accountPage/user.html'))
// router.use(post('/create_user', userCreate))
router.post('/json', async (req, res) => {
  userCreate(req.body)
  res.header({ 'Content-Type': 'application/json' })
  res.status(201)
})

// router.get('/user', controller.getUser)
// router.get('/login', controller.login)
// router.post('/registration', controller.registration)

export default router
