import express from 'express'
import serverRoutes from './controllers/servers'
import { env } from 'process'
require('dotenv').config()

// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

const app = express()

app.get('/', async (req, res) => {
  res.end('Hi!')
})

const PORT = env.PORT ?? 4200

app.use(serverRoutes)

app.listen(PORT, () =>
  console.log(`\u2705\nNODE_ENV===${env.NODE_ENV}\nhttp://localhost:` + PORT),
)
