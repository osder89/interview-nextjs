import type { Prisma } from "@prisma/client"

export type IUser = Prisma.usersGetPayload<{}> 

export class User {
  id: number
  name: string
  email: string
  password: string

  constructor(data: IUser) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
    this.password = data.password
  }
}
