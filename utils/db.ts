import { Sequelize, UniqueConstraintError } from 'sequelize'
import dotenv from 'dotenv'
import pg from 'pg'
;(global as any).pg = pg
if (process.env.NODE_ENV !== 'production') dotenv.config()
declare global { var __sequelize: Sequelize | undefined; var __dbInit: Promise<void> | undefined }
const url = process.env.DATABASE_URL
if (!url) throw new Error('DATABASE_URL not set')
const opts = {
  dialect: 'postgres' as const,
  protocol: 'postgres',
  dialectModule: pg,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  logging: false
}
export const sequelize: Sequelize = global.__sequelize ?? new Sequelize(url, opts)
if (process.env.NODE_ENV !== 'production') global.__sequelize = sequelize

export function initDB(): Promise<void> {
  if (!global.__dbInit) {
    global.__dbInit = (async () => {
      require('../models/user')
      require('../models/reviews')
      try {
        await sequelize.sync({ alter: true })
      } catch (e) {
        if (!(e instanceof UniqueConstraintError)) throw e
      }
    })()
  }
  return global.__dbInit!
}

export default sequelize
