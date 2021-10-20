// import { PrismaClient } from '.prisma/client'
// import bcrypt from 'bcryptjs'
// import jwt, { Secret } from 'jsonwebtoken'
// import { env } from 'process'

// require('dotenv').config()
// const prisma = new PrismaClient()

// const generatorJWTToken = (
//   user_id: string,
//   roles: 'ADMIN' | 'USER' | 'WRITER',
//   nick_name: string,
//   email: string,
// ) => {
//   const payload = {
//     user_id,
//     roles,
//     nick_name,
//     email,
//   }
//   return jwt.sign(payload, env.JWT_SECRET as Secret, {
//     expiresIn: '24h',
//   })
// }

// class AuthController {
//   async user(req: any, res: any) {
//     try {
//       const { id } = req.body
//       const user = await prisma.user.findUnique({
//         where: { id },
//         select: {
//           id: true,
//           nick_name: true,
//           first_name: true,
//           last_name: true,
//           birthday: true,
//         },
//       })
//       return { ...user }
//     } catch (e) {
//       console.log(e)
//       res.status(400).json({ message: ' Registration error' })
//     }
//   }
//   async users() {
//     //      const [users, countWhere, countAll] = await Promise.all([
//     //     prisma.user.findMany({
//     //       where: args.where || undefined,
//     //       orderBy: args.orderBy || undefined,
//     //       skip: args.skip || undefined,
//     //       take: args.take || undefined,
//     //       select: {
//     //         id: true,
//     //         created_at: true,
//     //         nick_name: true,
//     //         first_name: true,
//     //         last_name: true,
//     //         description: true,
//     //         birthday: true,
//     //       },
//     //     }),
//     //     prisma.user.count({
//     //       where: args.where || undefined,
//     //     }),
//     //     prisma.user.count(),
//     //   ])
//     //   return { users, countWhere, countAll }
//   }
//   async registration(req: any, res: any) {
//     try {
//       const {
//         nick_name,
//         first_name,
//         last_name,
//         description,
//         birthday,
//         email,
//         pass,
//       } = req.body
//       if (pass.length < 9) {
//         alert('Короткий пароль!')
//         console.log('Короткий пароль!')
//         throw new Error('Короткий пароль!')
//       }
//       const oldUser = await prisma.user.findUnique({
//         where: { nick_name: nick_name },
//       })
//       if (!!oldUser) {
//         alert('Такой nickname уже существует!')
//         console.log('Такой nickname уже существует!')
//         throw new Error('Такой nickname уже существует!')
//       }
//       const oldEmail = await prisma.user.findUnique({
//         where: { email: email },
//       })
//       if (!!oldEmail) {
//         alert('Такой email уже существует!')
//         console.log('Такой email уже существует!')
//         throw new Error('Такой email уже существует!')
//       }
//       //проверка пароля на длину, отсутствие лишних символов
//       const encryptedPassword = await bcrypt.hash(pass, 10)
//       //проверка пароля на длину, отсутствие лишних символов
//       //проверка на такой ник или емайл
//       //сообщить юзеру что поменять
//       const user = await prisma.user.create({
//         data: {
//           nick_name: nick_name,
//           first_name: first_name,
//           last_name: last_name,
//           description: description,
//           birthday: new Date(birthday),
//           email: email,
//           password: {
//             create: {
//               password: encryptedPassword,
//             },
//           },
//         },
//       })
//       return user
//     } catch (e) {
//       console.log(e)
//       res.status(400).json({ message: ' Registration error' })
//     }
//   }

//   async login(req: any, res: any) {
//     try {
//       const { login, pass } = req.body
//       let email, nick

//       //   check(login, 'Имя пользователя не может быть пустым!').notEmpty()
//       //   check(pass, 'Пароль должен быть от 8 символов')
//       //     .isLength({ min: 8 })
//       //     .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)

//       if (login.indexOf('@') > 0) {
//         email = login
//       } else {
//         nick = login
//       }
//       //библиотека для валидации данных
//       const user = await prisma.user.findUnique({
//         where: nick ? { nick_name: nick } : { email: email },
//         select: {
//           id: true,
//           role: true,
//           nick_name: true,
//           email: true,
//         },
//       })
//       if (user) {
//         const password = await prisma.userPass.findUnique({
//           where: { user_id: user.id },
//           select: { password: true },
//         })
//         if (password?.password) {
//           if (bcrypt.compareSync(pass, password.password)) {
//             const token = generatorJWTToken(
//               user.id,
//               user.role,
//               user.nick_name,
//               user.email,
//             )
//             req.token = token
//             res.cookie('auth', token)
//             console.log('token: ', token)
//             //почитать про вывод ошибок на фронт
//             return token
//           } else {
//             throw new Error('Неправильно введен пароль!  ')
//           }
//         }
//       } else {
//         throw new Error(
//           'Вы ввели неправильный логин или вашего аккаунта не существует!',
//         )
//       }
//     } catch (e) {
//       console.log(e)
//       req.statusCode(400).json({ message: ' Registration error' })
//     }
//   }
// }

// export default new AuthController()
// // module.exports = new AuthController()
