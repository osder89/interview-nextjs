import { Sequelize, UniqueConstraintError } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

declare global {
  var __sequelize: Sequelize | undefined
  var __dbInit: Promise<void> | undefined
}

const connectionString = process.env.DATABASE_URL!
const options = {
  dialect: 'postgres' as const,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false,
}

export const sequelize: Sequelize = global.__sequelize ?? new Sequelize(connectionString, options)

if (!process.env.DATABASE_URL) {
  throw new Error('❌ DATABASE_URL no está definida')
}

export function initDB(): Promise<void> {
  if (!global.__dbInit) {
    global.__dbInit = (async () => {
      await import('../models/user')
      await import('../models/reviews')
      try {
        await sequelize.sync({ alter: true })
        console.log('✅ Database synchronized automatically')
      } catch (e) {
        if (!(e instanceof UniqueConstraintError)) {
          throw e
        }
      }
    })()
  }
  return global.__dbInit!
}

export default sequelize
