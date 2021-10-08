import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export type QV<T, V> = (prisma: T, args2: V) => T & V

export type PQV<T, V> = (args1: T, args2: V) => T

export type PQVN<T, V> = (args1: T, args2: V) => V | null
