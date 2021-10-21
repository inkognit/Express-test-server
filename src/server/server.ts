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
  const payload = Object.assign((jwt.decode(req.cookies.auth) as object) || {})
  // req.body = payload
  console.log(payload)
  next()
})
app.use('/', routes)
app.use('/about.html', routes)
app.use('/auth.html', routes)
app.use('/registration.html', routes)
app.use('/user.html', routes)

const PORT = env.PORT ?? 4200

app.listen(PORT, () =>
  console.log(
    `\n \u2705 - The Server is running!\nNODE_ENV = ${env.NODE_ENV}\nhttp://localhost:` +
      PORT,
  ),
)
