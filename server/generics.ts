import { PrismaClient } from '@prisma/client'

export type TQctx = {
  user_id: string | undefined
  is_admin: boolean
}

type TQprops = {
  prisma: PrismaClient
  ctx: TQctx
}

export type PQ<T> = (p: TQprops) => Promise<T>
export type PQV<T, V> = (p: TQprops, vars: V) => Promise<T>
export type PQVN<T, V> = (p: TQprops, vars: V) => Promise<T | null>

// export type QV<T, V> = (prisma: T, args2: V) => T & V

// export type PQV<T, V> = (args1: T, args2: V) => T

// export type PQVN<T, V> = (args1: T, args2: V) => V | null
