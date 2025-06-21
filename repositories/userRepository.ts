
import { Prisma } from '@prisma/client'
import prisma from '../utils/prisma'

export const createUser = async (data: {
  name: string
  email: string
  password: string
}) => {
  return await prisma.users.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })
}

export const getUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
  })
}

export const getUsersWithReviews = async () => {
  return await prisma.users.findMany({
    include: { reviews: true },
  })
}