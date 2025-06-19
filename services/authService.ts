

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as userRepository from '../repositories/userRepository'

const JWT_SECRET = process.env.JWT_SECRET!

export const registerUser = async (data: {
  name: string
  email: string
  password: string
}) => {
  const existing = await userRepository.getUserByEmail(data.email)
  if (existing) {
    throw new Error('Email already in use')
  }
  const hash = await bcrypt.hash(data.password, 10)
  const user = await userRepository.createUser({
    name: data.name,
    email: data.email,
    password: hash
  })
  return user
}

export const loginUser = async (email: string, password: string) => {
  const user = await userRepository.getUserByEmail(email)
  if (!user) {
    throw new Error('Invalid email or password')
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw new Error('Invalid email or password')
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  )
  return token
}