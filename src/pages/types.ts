import { Prisma } from ".prisma/client";

export enum EUserRole {
  admin = "admin",
  author = "author",
  editor = "editor",
  user = "user",
}

type Q<T> = () => Promise<T>;
type QV<T, V> = (vars: V) => Promise<T>;
type QVN<T, V> = (vars: V) => Promise<T | null>;

// USERS
export type TPageUsers_item = {
  id?: string;
  created_at: any;
  nick_name: string;
  first_name: string | null;
  last_name: string | null;
  description: string | null;
  birthday: any;
  role?: EUserRole;
};
export type TPageUsers = {
  users: TPageUsers_item[];
  countWhere: number;
  countAll: number;
};

export type TPageUsers_vars = {
  where?: Prisma.UserWhereInput | null;
  orderBy?: Prisma.UserOrderByWithRelationInput[] | null;
  take?: number | null;
  skip?: number | null;
};
export type TPageUsers_load = QV<TPageUsers, TPageUsers_vars>;

export type TPageUser_item = {
  id?: string;
  nick_name?: string;
  first_name?: string | null;
  last_name?: string | null;
  birthday?: Date | null;
  description?: string | null;
  email?: string;
};

export type TPageUser = {
  user: TPageUser_item;
};
export type TPageUser_vars = { id: string };

export type TPageUser_load = QV<TPageUser, TPageUser_vars>;

export type TUserUpdate_vars = {
  id?: string;
  nick_name?: string;
  first_name?: string | null;
  last_name?: string | null;
  birthday?: Date | null;
  description?: string | null;
  email?: string;
  pass?: string;
  new_pass?: string;
};
