import express, { Express } from 'express'
import authRoutes from './controllers/routes'
import { env } from 'process'

require('dotenv').config()

const app: Express = express()
app.use(express.json())
app.use((req, res, next) => {
  console.log('start')
  // извлечь payload и закинуть в "хранилище". к этому хранилищу имеет доступ каждый мидл(express context)
  next()
})
app.use('/', authRoutes)
app.use('/about.html', authRoutes)
app.use('/auth.html', authRoutes)
app.use('/registration.html', authRoutes)
// app.use('/json', authRoutes)
app.use('/user.html', authRoutes)

const PORT = env.PORT ?? 4200

app.listen(PORT, () =>
  console.log(
    `\n \u2705 - The Server is running!\nNODE_ENV = ${env.NODE_ENV}\nhttp://localhost:` +
      PORT,
  ),
)
