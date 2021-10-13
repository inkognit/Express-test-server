import express from 'express'
import controller from './authController'
import { get } from '../controllers/httpMethods'

const router = express.Router()

router.use(get('/', 'accountPage/mainPage.html'))
router.use(get('/about.html', 'accountPage/about.html'))
router.use(get('/auth.html', 'accountPage/auth.html'))
router.use(get('/registration.html', 'accountPage/registration.html'))

router.get('/json', async (req, res) => {
  res.header({ 'Content-Type': 'application/json' })
  res.json({
    name: 'Michael',
    age: 23,
  }),
    (res.statusCode = 200)
})

router.get('/user', controller.getUser)
router.get('/login', controller.login)
router.post('/registration', controller.registration)

export default router
