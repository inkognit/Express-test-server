import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class AuthController {
  async getUser(req: any, res: any) {
    try {
      res.json('server to work!')
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: ' Registration error' })
    }
  }
  async registration(req: any, res: any) {
    try {
      const { nick_name, pass } = req.body
      const candidate = async (args: {
        email: string
        password: string
        prisma: PrismaClient
      }) => {
        //извлечь юзера по логу
        const user = await prisma.user.findUnique({
          where: {},
        })
      }
      if (!candidate) {
        const createUser = async (args: {
          email: string
          prisma: PrismaClient
        }) => {
          const max_id = await args.prisma.user.findMany({
            take: 1,
            orderBy: { php_id: 'desc' },
            select: { php_id: true },
          })
          const php_id = max_id[0].php_id + 1
          const { prisma } = args
          const user = await prisma.user.create({
            data: {
              email: args.email,
              php_id,
              nick_name: '',
              birthday: new Date(),
            },
          })
          return user
        }
      }
      return res
        .status(400)
        .json({ message: 'Пользователь с таким Именем уже сущестует' })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: ' Registration error' })
    }
  }
  async login(req: any, res: any) {
    try {
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: ' Registration error' })
    }
  }
}

export default new AuthController()
// module.exports = new AuthController()
