import { PrismaClient } from ".prisma/client";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import express from "express";
import jwt, { Secret } from "jsonwebtoken";
import { env } from "process";
import { AUTHNAME, SYSTEM_MESSAGE } from "../const";
const router = express.Router();

router.use(cookieParser());
require("dotenv").config();

const prisma = new PrismaClient();

export const generatorJWTToken = (user_id: string) => {
  const payload = {
    user_id,
  };
  return jwt.sign(payload, env.JWT_SECRET as Secret, {
    expiresIn: "24h",
  });
};

// export type TUserCreate_db = PQVN<
//   TPageUser_item,
//   {
//     nick_name: string;
//     first_name: string;
//     last_name: string;
//     description: string;
//     birthday: Date | string;
//     email: string;
//     pass: any;
//   }
//   >;

export const userCreate = async (
  req: {
    body: {
      nick_name: string;
      first_name: string | "";
      last_name: string | "";
      description: string | "";
      birthday: Date;
      email: string;
      pass: string;
    };
  },
  res: any
) => {
  const {
    nick_name,
    first_name,
    last_name,
    description,
    birthday,
    email,
    pass,
  } = req.body;
  const existUser = await prisma.user.findUnique({
    where: { nick_name },
  });
  if (existUser) {
    res.json(SYSTEM_MESSAGE.error_nick_exist);
  } else {
    const existEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existEmail) {
      res.json(SYSTEM_MESSAGE.error_email_exist);
    } else {
      if (!pass.match(/^[a-zA-Z0-9]{5,15}$/)) {
        res.json(SYSTEM_MESSAGE.error_pass_valid);
      } else {
        const encryptedPassword = await bcrypt.hash(pass, 10);
        const user = await prisma.user.create({
          data: {
            nick_name,
            first_name,
            last_name,
            description,
            birthday: new Date(birthday),
            email,
            password: {
              create: {
                password: encryptedPassword,
              },
            },
          },
        });
        res.json(SYSTEM_MESSAGE.ok);
        return user;
      }
    }
  }
};

export const login = async (req: any, res: any) => {
  const { login, pass } = req.body;
  let email, nick_name;

  if (login.match(/^[^\s@]+@[^\s@]+$/)) {
    email = login;
  } else {
    nick_name = login;
  }

  const user = await prisma.user.findUnique({
    where: nick_name ? { nick_name } : { email },
    select: {
      id: true,
      role: true,
      nick_name: true,
      email: true,
    },
  });
  if (user) {
    const password = await prisma.userPass.findUnique({
      where: { user_id: user.id },
      select: { password: true },
    });
    if (password?.password) {
      if (bcrypt.compareSync(pass, password.password)) {
        const tokenClear = generatorJWTToken(user.id);
        const token = `${tokenClear}`;
        res.cookie(AUTHNAME, token);
        console.log("токен создан");
        return res.json({ token, ...SYSTEM_MESSAGE.ok });
      } else {
        res.json(SYSTEM_MESSAGE.error_pass);
        throw new Error("Неправильно введен пароль!");
      }
    }
  } else {
    res.json(SYSTEM_MESSAGE.error_log);
    throw new Error(
      "Вы ввели неправильный логин или вашего аккаунта не существует!"
    );
  }
};
