import express from 'express'
import { get, PATH, post } from './httpMethods'
import { login, user, userCreate } from '../queries/user'

// const authRouts = require('./authRouts')
var cookieParser = require('cookie-parser')
const router = express.Router()

router.use(cookieParser())

router.use(get('/', 'accountPage/mainPage.html'))
router.use(get('/registration.html', 'accountPage/registration.html'))
router.use(get('/user.html', 'accountPage/user.html'))

router.use(post('/create_user', userCreate))

router.get('/loginPage.html', async (req, res) => {
  res.contentType('text/html')
  res.status(200)
  const user_id = req.cookies.auth
  if (!user_id) {
    res.sendFile(PATH(__dirname) + `/pages/accountPage/loginPage.html`)
  } else {
    res.send('Вы уже авторизированы!')
  }
})

router.post('/login', async (req, res) => {
  res.contentType('application/json')
  res.status(201)
  await login(req, res)
})

router.post('/exit', async (req, res) => {
  res.clearCookie('auth', {
    domain: req.hostname,
    expires: new Date(0),
    path: '/',
  })
  res.sendStatus(201)
})

router.get('/about.html', async (req, res) => {
  res.contentType('text/html')
  res.sendFile(PATH(__dirname) + `/pages/accountPage/about.html`)
})

router.get('/about-data', async (req, res) => {
  res.contentType('application/json')
  const data = await user(req, res)
  res.json(data)
})

export default router
