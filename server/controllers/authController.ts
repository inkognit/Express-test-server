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
      const candidate = async (args: any) => {
        //извлечь юзера по логу
      }
      if (!candidate) {
        const createUser = async (props: any, args: any) => {
          const { prisma } = props
          const user = await prisma.users.create({
            data: {
              created_at: args.created_at,
              nick_name: args.nick_name,
              first_name: args.first_name,
              last_name: args.last_name,
              description: args.description,
              birthday: args.birthday,
              userPass: {
                create: {
                  created_at: new Date(),
                  pass: args.userPass.pass,
                },
              },
            },
            select: { id: true },
          })
          return {}
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
