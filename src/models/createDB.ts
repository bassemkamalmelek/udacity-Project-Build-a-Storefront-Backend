//import configs
import config from '../config'
import { Pool } from 'pg'

const client = new Pool({
  host: config.host,
  port: config.port as unknown as number,
  user: config.init_user,
  password: config.init_password,
})

export class Database {
  // create and setup database

  async setupDatabase(): Promise<boolean> {
    try {
      const conn = await client.connect()
      console.log('1----------- Connected')
      await conn.query(
        'CREATE USER ' +
          config.user +
          " WITH PASSWORD '" +
          config.password +
          "' SUPERUSER  CREATEDB CREATEROLE;"
      )
      console.log('2----------- User Created')
      await conn.query('CREATE DATABASE ' + config.devdb)
      console.log('3----------- devDB Created')

      await conn.query('CREATE DATABASE ' + config.testdb)
      console.log('4----------- testDB Created')

      await conn.query(
        'GRANT ALL PRIVILEGES ON DATABASE ' +
          config.devdb +
          ' TO ' +
          config.user
      )
      console.log('5----------- devDB Granted')

      await conn.query(
        'GRANT ALL PRIVILEGES ON DATABASE ' +
          config.testdb +
          ' TO ' +
          config.user
      )
      console.log('6----------- testDB Granted')

      conn.release()

      return true
    } catch (error) {
      console.log(error)

      throw new Error(`Could not Setup the database. Error: ${error}`)
    }
  }
}
