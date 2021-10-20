import { env } from 'process'
import jwt, { Secret } from 'jsonwebtoken'

require('dotenv').config()

export default (req: any, res: any, next: Function) => {
  if (req.method === 'OPTION') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      res.status
      return res.status(403).json({ message: 'Пользователь не авторизован!' })
    }
    const decodeDATA = jwt.verify(token, env.JWT_SECRET as Secret)
    console.log('decodeDATA: ', decodeDATA)
    next()
  } catch (e) {
    console.error(e)
    return res.status(403).json({ message: 'Пользователь не авторизован!' })
  }

  console.log('start')
  next()
}
