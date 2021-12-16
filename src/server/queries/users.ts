import { PrismaClient } from ".prisma/client";
import { PQV } from "generics";

// export type TPageUsers_db = PQV<TPageUsers, TPageUsers_vars>;
export const users = async (args: any) => {
  const prisma = new PrismaClient();
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
  ]);
  return { users, countWhere, countAll };
};

type TData = {
  id?: string;
  nick_name?: string;
  first_name?: string | null;
  last_name?: string | null;
  birthday?: Date | null;
  description?: string | null;
  email?: string;
};

export const user = async (req: any, res: any) => {
  const prisma = new PrismaClient();
  const { user_id } = req.query;
  const user: TData | null = await prisma.user.findUnique({
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

type TPageUserUp_db = PQV<TData, TData>;
export const user_up: TPageUserUp_db = async (props, data) => {
  const { user_id, prisma } = props;
  const user_up = await prisma.user.update({
    where: { id: user_id },
    data,
  });
  return user_up;
};
