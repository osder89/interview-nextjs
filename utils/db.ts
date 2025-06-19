import { Sequelize, UniqueConstraintError } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
  logging: false,
})

if (process.env.SYNC_DATABASE === 'true') {
  ;(async () => {
    await import('../models/user')
    await import('../models/reviews')
    try {
      await sequelize.sync({ alter: true })
      console.log('✅ Database synchronized automatically')
    } catch (e) {
      if (!(e instanceof UniqueConstraintError)) throw e
    }
  })().catch(e => console.error('❌ DB sync error:', e))
}

export default sequelize
