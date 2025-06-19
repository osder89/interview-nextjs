
import User from '../models/user'

export const createUser = async (data: {
  name: string
  email: string
  password: string
}) => {
  return await User.create(data)
}

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } })
}
