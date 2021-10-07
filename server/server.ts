import express from 'express'
import serverRoutes from './controllers/servers'
import { env } from 'process'
// import { getFunc } from './index'
require('dotenv').config()

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
const app = express()

const PATH = (__dirname: any): string => {
  const path = __dirname.split('/')
  const newPath = path.slice(0, path.length - 1)
  return newPath.join('/')
}

app.get('/', async (req, res) => {
  console.log('wtf?!?!?!?!?')
  res.sendFile(PATH(__dirname) + '/pages/accountPage/mainPage.html')
})

// getFunc('/auth.html', 'accountPage/auth.html')
app.get('/auth.html', async (req, res) => {
  res.sendFile(PATH(__dirname) + `/pages/accountPage/auth.html`)
})
const PORT = env.PORT ?? 4200

app.use(serverRoutes)

app.listen(PORT, () =>
  console.log(
    `\u2705 - The Server is running!\nNODE_ENV===${env.NODE_ENV}\nhttp://localhost:` +
      PORT,
  ),
)
