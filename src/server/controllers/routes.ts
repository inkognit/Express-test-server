import express from 'express'
import { get, post } from './httpMethods'

import { login, userCreate } from '../queries/user'
// const authRouts = require('./authRouts')
var cookieParser = require('cookie-parser')
const router = express.Router()

router.use(cookieParser())

router.use(get('/', 'accountPage/mainPage.html'))
router.use(get('/about.html', 'accountPage/about.html'))
router.use(get('/auth.html', 'accountPage/auth.html'))
router.use(get('/registration.html', 'accountPage/registration.html'))
router.use(get('/user.html', 'accountPage/user.html'))

// router.use('/login', authRouts)

router.use(post('/create_user', userCreate))
router.use(post('/login', login))

// router.post('/login', async (req, res) => {
//   res.contentType('application/json')
//   res.status(201)

//   const token = login(req.body)
//   console.log('token in routs: ', token)
//   res.cookie('auth', token)
//   res.send('ok')
// })

export default router
