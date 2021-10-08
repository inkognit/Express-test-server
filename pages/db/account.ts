// import { TPageUser_item, TUserCreate_var } from '../types'
// import { PQV } from '../../server/generics'

// export type TCreateUser = PQV<TPageUser_item, TUserCreate_var>
// export const createUser: TCreateUser = async (props, args) => {
//   const { prisma } = props
//   const user = await prisma.users.create({
//     data: {
//       created_at: args.created_at,
//       nick_name: args.nick_name,
//       first_name: args.first_name,
//       last_name: args.last_name,
//       description: args.description,
//       birthday: args.birthday,
//       userPass: {
//         create: {
//           created_at: new Date(),
//           pass: args.userPass.pass,
//         },
//       },
//     },
//     select: { id: true },
//   })
//   return {}
// }
