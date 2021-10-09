import express, { Express } from 'express'
import authRoutes from './controllers/servers'
import { env } from 'process'

import { getFunc } from './middlewares/middlewares'
require('dotenv').config()

const app: Express = express()

app.use(getFunc('/', 'accountPage/mainPage.html'))
app.use(getFunc('/auth.html', 'accountPage/auth.html'))

app.use(express.json())
app.use('/auth', authRoutes)

const PORT = env.PORT ?? 4200

app.listen(PORT, () =>
  console.log(
    `\u2705 - The Server is running!\nNODE_ENV===${env.NODE_ENV}\nhttp://localhost:` +
      PORT,
  ),
)
