import express from 'express'
import { get } from './middlewares'
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

export default router
