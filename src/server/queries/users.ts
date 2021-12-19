import bcrypt from "bcryptjs";
import { PQVN, PQVNU } from "generics";
import {
  TPageUsers,
  TPageUsers_vars,
  TPageUser_item,
  TPageUser_vars,
  TUserUpdate_vars,
} from "../../pages/types";
import { SYSTEM_MESSAGE } from "../const";

export type TPageUsers_db = PQVNU<TPageUsers, TPageUsers_vars>;
export const users: TPageUsers_db = async ({ prisma }, args) => {
  const [users, countWhere, countAll] = await Promise.all([
    prisma.user.findMany({
      where: args?.where || undefined,
      orderBy: args?.orderBy || undefined,
      skip: args?.skip || undefined,
      take: args?.take || undefined,
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
      where: args?.where || undefined,
    }),
    prisma.user.count(),
  ]);
  return { users, countWhere, countAll };
};
type TPageUser_db = PQVNU<TPageUser_item, TPageUser_vars>;
export const user: TPageUser_db = async (props) => {
  const { user_id, prisma } = props;
  const user = await prisma.user.findUnique({
    where: { id: user_id },
    select: {
      id: true,
      nick_name: true,
      first_name: true,
      last_name: true,
      birthday: true,
      description: true,
      email: true,
    },
  });
  return user;
};

type TPageUserUp_db = PQVN<TPageUser_item, TUserUpdate_vars>;
export const user_up: TPageUserUp_db = async (props, data, res) => {
  const { user_id, prisma } = props;
  let ok: boolean = true;
  if (data.nick_name) {
    const existUser = await prisma.user.findUnique({
      where: { nick_name: data.nick_name },
    });
    if (existUser) {
      res?.json(SYSTEM_MESSAGE.error_nick_exist);
      ok = false;
    }
  }
  if (data.email) {
    const existEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existEmail) {
      res?.json(SYSTEM_MESSAGE.error_email_exist);
      ok = false;
    }
  }
  //----------------------------------------------------------------

  if (data.pass && data.new_pass && user_id) {
    if (
      data.pass.match(/^[a-zA-Z0-9]{5,15}$/) &&
      data.new_pass.match(/^[a-zA-Z0-9]{5,15}$/)
    ) {
      const password = await prisma.userPass.findUnique({
        where: {
          user_id,
        },
        select: { password: true },
      });
      if (password) {
        if (bcrypt.compareSync(data.pass, password.password)) {
          await prisma.userPass.update({
            where: { user_id },
            data: { password: await bcrypt.hash(data.new_pass, 10) },
          });
          res?.json(SYSTEM_MESSAGE.ok);
        } else {
          ok = false;
          res?.json(SYSTEM_MESSAGE.error_pass);
        }
      } else {
        ok = false;
        res?.json(SYSTEM_MESSAGE.error_pass);
      }
    } else {
      res?.json(SYSTEM_MESSAGE.error_pass_valid);
      ok = false;
    }
  }
  //-------------------------------------------------------------
  if (ok) {
    const user_up = await prisma.user.update({
      where: { id: user_id },
      data: {
        nick_name: data.nick_name,
        first_name: data.first_name,
        last_name: data.last_name,
        description: data.description,
        email: data.email,
        birthday: new Date(data.birthday || ""),
      },
    });

    return user_up;
  }
  let req = {
    query: {
      user_id,
    },
  };
  return user(props);
};
