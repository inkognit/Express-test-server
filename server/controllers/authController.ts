// import { PrismaClient } from '@prisma/client'
// import { PQVN } from 'generics'
// const prisma = new PrismaClient()

// class AuthController {
//   async getUser(req: any, res: any) {
//     try {
//       res.json('server to work!')
//     } catch (e) {
//       console.log(e)
//       res.status(400).json({ message: ' Registration error' })
//     }
//   }

//   async registration(req: any, res: any) {
//     try {
//       const { nick_name, pass } = req.body
//       const candidate = async (args: {
//         email: string
//         password: string
//         prisma: PrismaClient
//       }) => {
//         //извлечь юзера по логу
//         const user = await prisma.user.findUnique({
//           where: {},
//         })
//       }
//       if (!candidate) {
//         const createUser = async (args: {
//           email: string
//           prisma: PrismaClient
//         }) => {
//           type TCreateUser_db = PQVN<
//             {
//               id?: string | undefined
//               created_at?: any
//               nick_name: string
//               first_name: string
//               last_name: string
//               description?: string | undefined
//               birthday?: any
//             },
//             {
//               nick_name: string
//               first_name: string
//               last_name: string
//               description: string
//               birthday: Date
//               email: string
//               password: string
//             }
//           >
//           const createUser: TCreateUser_db = async ({ prisma }, args) => {
//             const user = await prisma.user.create({
//               data: {
//                 nick_name: args.nick_name,
//                 first_name: args.first_name,
//                 last_name: args.last_name,
//                 description: args.description,
//                 birthday: args.birthday,
//                 email: args.email,
//                 password: {
//                   create: {
//                     password: args.password,
//                   },
//                 },
//               },
//             })
//             return user
//           }

//           return createUser
//         }
//       }
//       return res
//         .status(400)
//         .json({ message: 'Пользователь с таким Именем уже сущестует' })
//     } catch (e) {
//       console.log(e)
//       res.status(400).json({ message: ' Registration error' })
//     }
//   }

//   async login(req: any, res: any) {
//     try {
//     } catch (e) {
//       console.log(e)
//       res.status(400).json({ message: ' Registration error' })
//     }
//   }
// }

// export default new AuthController()
// // module.exports = new AuthController()
