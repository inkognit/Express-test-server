import express, { Express } from 'express'
import routes from './controllers/routes'
import { env } from 'process'
import cookieParser from 'cookie-parser'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

require('dotenv').config()

const app: Express = express()

app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  if (req.cookies.auth) {
    const payload = Object.assign(jwt.decode(req.cookies.auth) as object)
    console.log('server объект полный')
    req.body = payload
  }

  next()
})
app.use('/', routes)

const PORT = env.PORT ?? 4200

app.listen(PORT, () =>
  console.log(
    `\n \u2705 - The Server is running!\nNODE_ENV = ${env.NODE_ENV}\nhttp://localhost:` +
      PORT,
  ),
)
