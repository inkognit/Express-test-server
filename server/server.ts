import express, { Express } from 'express'
import authRoutes from './middlewares/registration'
import { env } from 'process'

require('dotenv').config()

const app: Express = express()
app.use(express.json())

app.use('/', authRoutes)
app.use('/about.html', authRoutes)
app.use('/auth.html', authRoutes)
app.use('/registration.html', authRoutes)
app.use('/json', authRoutes)

const PORT = env.PORT ?? 4200

app.listen(PORT, () =>
  console.log(
    `\n \u2705 - The Server is running!\nNODE_ENV = ${env.NODE_ENV}\nhttp://localhost:` +
      PORT,
  ),
)
