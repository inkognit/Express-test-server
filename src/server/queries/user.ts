import {
  TPageUsers,
  TPageUsers_vars,
  TPageUser_item,
  TPageUser_vars,
} from '../../pages/types'
import { PrismaClient } from '.prisma/client'
import { PQV, PQVN } from '../generics'
import bcrypt from 'bcryptjs'
import jwt, { Secret } from 'jsonwebtoken'
import { env } from 'process'

require('dotenv').config()

const prisma = new PrismaClient()

const generatorJWTToken = (
  id: string,
  roles: 'ADMIN' | 'USER' | 'WRITER',
  nick_name: string,
  email: string,
) => {
  const payload = {
    id,
    roles,
    nick_name,
    email,
  }

  return jwt.sign(payload, env.JWT_SECRET as Secret, {
    expiresIn: '24h',
  })
}

export type TPageUsers_db = PQV<TPageUsers, TPageUsers_vars>
export const users: TPageUsers_db = async (args) => {
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

export type TPageUser_db = PQV<TPageUser_item, TPageUser_vars>
export const user: TPageUser_db = async (args) => {
  const user = await prisma.user.findUnique({
    where: { id: args.id },
    select: {
      id: true,
      nick_name: true,
      first_name: true,
      last_name: true,
      birthday: true,
    },
  })
  return { ...user }
}

export type TUserCreate_db = PQVN<
  TPageUser_item,
  {
    nick_name: string
    first_name: string
    last_name: string
    description: string
    birthday: Date | string
    email: string
    pass: any
  }
>
export const userCreate: TUserCreate_db = async (args) => {
  const encryptedPassword = await bcrypt.hash(args.pass, 10)
  //проверка пароля на длину, отсутствие лишних символов
  //проверка на такой ник или емайл
  //сообщить юзеру что поменять
  const user = await prisma.user.create({
    data: {
      nick_name: args.nick_name,
      first_name: args.first_name,
      last_name: args.last_name,
      description: args.description,
      birthday: new Date(args.birthday),
      email: args.email,
      password: {
        create: {
          password: encryptedPassword,
        },
      },
    },
  })
  return user
}

export const login = async (args: { login: string; pass: string }) => {
  let email, nick

  if (args.login.indexOf('@') > 0) {
    email = args.login
  } else {
    nick = args.login
  }
  //библиотека для валидации данных
  const user = await prisma.user.findUnique({
    where: nick ? { nick_name: nick } : { email: email },
    select: {
      id: true,
      role: true,
      nick_name: true,
      email: true,
    },
  })
  if (user) {
    const password = await prisma.userPass.findUnique({
      where: { user_id: user.id },
      select: { password: true },
    })
    if (password?.password) {
      if (bcrypt.compareSync(args.pass, password.password)) {
        const token = generatorJWTToken(
          user.id,
          user.role,
          user.nick_name,
          user.email,
        )
        console.log(JSON.stringify(token))
        console.log('ok!')
        //почитать про вывод ошибок на фронт
        return JSON.stringify(token)
      } else {
        console.log('Неправильно введен пароль!')
      }
    }
  } else {
    console.log(
      'Вы ввели неправильный логин или вашего аккаунта не существует!',
    )
  }
}
