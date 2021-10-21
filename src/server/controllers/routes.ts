import express from 'express'
import { get, PATH, post } from './httpMethods'

import { login, userCreate } from '../queries/user'
// const authRouts = require('./authRouts')
var cookieParser = require('cookie-parser')
const router = express.Router()

router.use(cookieParser())

router.use(get('/', 'accountPage/mainPage.html'))
router.use(get('/about.html', 'accountPage/about.html'))
// router.use(get('/auth.html', 'accountPage/auth.html'))
router.use(get('/registration.html', 'accountPage/registration.html'))
router.use(get('/user.html', 'accountPage/user.html'))

// router.use('/login', authRouts)

router.use(post('/create_user', userCreate))
// router.use(post('/login', login))

router.get('/auth.html', async (req, res) => {
  res.contentType('text/html')
  const user_id = req.cookies.auth
  console.log('req.body: ', user_id)
  res.status(200)
  if (!user_id) {
    res.sendFile(PATH(__dirname) + `/pages/accountPage/auth.html`)
  } else {
    res.send('Вы уже авторизированы!')
  }
})

router.post('/exit', async (req, res) => {
  console.log('before: ', req.body.user_id)

  res.clearCookie('auth', {
    domain: 'localhost',
    expires: new Date(0),
    path: '/',
  })
  res.sendStatus(200)

  return console.log('after: ', req.body.user_id)
})

router.post('/login', async (req, res) => {
  res.contentType('application/json')
  res.status(201)
  console.log('before: ', req)
  await login(req, res)
  console.log('after: ', req.body)
})

export default router
