import { PrismaClient } from ".prisma/client";
const prisma = new PrismaClient();

// export type TPageUsers_db = PQV<TPageUsers, TPageUsers_vars>;
export const users = async (args: any) => {
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

export const user = async (req: any, res: any) => {
  const { user_id } = req.query;
  const user = await prisma.user.findUnique({
    where: { id: user_id },
    select: {
      id: true,
      nick_name: true,
      first_name: true,
      last_name: true,
      birthday: true,
    },
  });
  return user;
};

export const user_up = async (req: any, res: any) => {
  const { user_id } = req.query;
  // const { data } = req.body;
  console.log(
    "**********************************************************\nquery:",
    req.body,
    "\n",
    user_id
  );
  const user_up = await prisma.user.update({
    where: { id: user_id },
    data: req.body,
  });
  return user_up;
};
