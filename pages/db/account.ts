import {
  TPageUser,
  TPageUsers,
  TPageUsers_vars,
  TPageUser_item,
  TPageUser_vars,
} from '../types'
import { PQV, PQVN } from '../../server/generics'

export type TPageUsers_db = PQV<TPageUsers, TPageUsers_vars>
export const users: TPageUsers_db = async ({ prisma }, args) => {
  const [users, countWhere, countAll] = await Promise.all([
    prisma.user.findMany({
      where: args.where || undefined,
      orderBy: args.orderBy || undefined,
      skip: args.skip || undefined,
      take: args.take || undefined,
      select: {
        id: true,
        created_at: true,
        nick_name: true,
        first_name: true,
        last_name: true,
        description: true,
        birthday: true,
      },
    }),
    prisma.user.count({
      where: args.where || undefined,
    }),
    prisma.user.count(),
  ])
  return { users, countWhere, countAll }
}

export type TPageUser_db = PQV<TPageUser, TPageUser_vars>
export const user: TPageUser_db = async ({ prisma }, args) => {
  const user = await prisma.user.findUnique({
    where: { id: args.id },
    select: {
      id: true,
      nick_name: true,
      first_name: true,
      last_name: true,
    },
  })
  return { user }
}

export type TCreateUser_db = PQVN<
  TPageUser_item,
  {
    nick_name: string
    first_name: string
    last_name: string
    description: string
    birthday: Date
    email: string
    password: string
  }
>
export const createUser: TCreateUser_db = async (props, args) => {
  const { prisma } = props
  const user = await prisma.user.create({
    data: {
      nick_name: args.nick_name,
      first_name: args.first_name,
      last_name: args.last_name,
      description: args.description,
      birthday: args.birthday,
      email: args.email,
      password: {
        create: {
          password: args.password,
        },
      },
    },
  })
  return user
}
