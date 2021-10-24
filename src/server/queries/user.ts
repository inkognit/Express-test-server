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
import { check } from 'express-validator'
import express from 'express'
import cookieParser from 'cookie-parser'
const router = express.Router()

router.use(cookieParser())
require('dotenv').config()

const prisma = new PrismaClient()

export const generatorJWTToken = (
  user_id: string,
  roles: 'ADMIN' | 'USER' | 'WRITER',
  nick_name: string,
  email: string,
) => {
  const payload = {
    user_id,
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

export const user = async (req: any, res: any) => {
  const { user_id } = req.body
  const user = await prisma.user.findUnique({
    where: { id: user_id },
    select: {
      id: true,
      nick_name: true,
      first_name: true,
      last_name: true,
      birthday: true,
    },
  })
  return user
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
  if (args.pass.length < 9) {
    alert('Короткий пароль!')
    console.log('Короткий пароль!')
    throw new Error('Короткий пароль!')
  }
  const oldUser = await prisma.user.findUnique({
    where: { nick_name: args.nick_name },
  })
  if (!!oldUser) {
    alert('Такой nickname уже существует!')
    console.log('Такой nickname уже существует!')
    throw new Error('Такой nickname уже существует!')
  }
  const oldEmail = await prisma.user.findUnique({
    where: { email: args.email },
  })
  if (!!oldEmail) {
    alert('Такой email уже существует!')
    console.log('Такой email уже существует!')
    throw new Error('Такой email уже существует!')
  }
  //проверка пароля на длину, отсутствие лишних символов
  const encryptedPassword = await bcrypt.hash(args.pass, 10)
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

export const login = async (req: any, res: any) => {
  // args: { login: string; pass: string }
  const { login, pass } = req.body
  let email, nick

  check(login, 'Имя пользователя не может быть пустым!').notEmpty()
  check(pass, 'Пароль должен быть от 8 символов')
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)

  if (login.indexOf('@') > 0) {
    email = login
  } else {
    nick = login
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
      if (bcrypt.compareSync(pass, password.password)) {
        const tokenClear = generatorJWTToken(
          user.id,
          user.role,
          user.nick_name,
          user.email,
        )
        const token = `${tokenClear}`
        res.cookie('auth', token)
        console.log('токен создан')
        //почитать про вывод ошибок на фронт
        return res.json({ token: token })
      } else {
        throw new Error('Неправильно введен пароль!  ')
      }
    }
  } else {
    throw new Error(
      'Вы ввели неправильный логин или вашего аккаунта не существует!',
    )
  }
}
