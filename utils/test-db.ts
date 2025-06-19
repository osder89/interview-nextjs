import dotenv from 'dotenv'
import { Client } from 'pg'

dotenv.config()

async function test() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.error('❌ No se leyó DATABASE_URL')
    process.exit(1)
  }
  const client = new Client({ connectionString: url })
  try {
    await client.connect()
    console.log('✅ Conectado a la base de datos correctamente')
  } catch (err) {
    console.error('❌ Error al conectar:', err)
  } finally {
    await client.end()
  }
}

test()
