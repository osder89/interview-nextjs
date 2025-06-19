import { UniqueConstraintError } from 'sequelize'
import sequelize from './db'

;(async () => {
  await import('../models/user')
  await import('../models/reviews')

  try {
    await sequelize.sync({ alter: true })
    console.log('✅ Database synchronized (alter:true)')
  } catch (e) {
    if (!(e instanceof UniqueConstraintError)) throw e
  } finally {
    await sequelize.close()
  }
})()
