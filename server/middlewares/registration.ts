import express from 'express'
import { get } from './middlewares'
const router = express.Router()

const PATH = (__dirname: any): string => {
  const path = __dirname.split('/')
  const newPath = path.slice(0, path.length - 2)
  return newPath.join('/')
}

router.use(get('/', 'accountPage/mainPage.html'))
router.use(get('/about.html', 'accountPage/about.html'))
router.use(get('/auth.html', 'accountPage/auth.html'))
router.use(get('/registration.html', 'accountPage/registration.html'))

export default router
