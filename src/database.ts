//import psotgres
import { Pool } from 'pg'

//import configs
import config from './config'

const client = new Pool({
  host: config.host,
  port: parseInt(config.port as string, 10),
  database: config.database,
  user: config.user,
  password: config.password,
})

client.on('error', (err) => {
  console.log(err.message)
})

export default client
