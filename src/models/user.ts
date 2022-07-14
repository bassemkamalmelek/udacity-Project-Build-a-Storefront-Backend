import Client from '../database'
import { User } from '../types/types'
import config from '../config'
import bcrypt from 'bcrypt'

const hashPassword = (password: string) => {
  const slt = parseInt(config.salt as string, 10)
  const pepper = config.pepper
  return bcrypt.hashSync(`${password}${pepper}`, slt)
}

export class UserModel {
  // reset auto increment
  /*   async resetAutoIncrement(): Promise<User[]> {
    try {
      const conn = await Client.connect()

      const sql2 = 'DELETE FROM users WHERE id != 0'
      const result2 = await conn.query(sql2)

      const sql = 'TRUNCATE TABLE users RESTART IDENTITY;'
      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not reset auto increment users. Error: ${err}`)
    }
  } */

  // create show all
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  //SELECT * FROM products ORDER BY price DESC;

  // show one , filter with id
  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(b: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (full_name, password) VALUES($1,$2) RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [
        b.full_name,
        hashPassword(b.password),
      ])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`Could not add new user ${b.full_name}. Error: ${err}`)
    }
  }

  async update(b: User): Promise<User> {
    try {
      const sql =
        'UPDATE users SET full_name=$1, password=$2 WHERE id=$3 RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [
        b.full_name,
        hashPassword(b.password),
        b.id,
      ])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`Could not update user ${b.full_name}. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *'
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      const user = result.rows[0]
      conn.release()
      return user
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`)
    }
  }

  async authenticate(
    full_name: string,
    password: string
  ): Promise<User | null> {
    try {
      const sql = 'SELECT password FROM users WHERE full_name=($1)'
      const conn = await Client.connect()
      const result = await conn.query(sql, [full_name])

      if (result.rows.length > 0) {
        const { password: hashedPassword } = result.rows[0]
        const pepper = config.pepper
        const isPWValid = bcrypt.compareSync(
          `${password}${pepper}`,
          hashedPassword
        )

        if (isPWValid) {
          const sql_GetInfo = 'SELECT * FROM users WHERE full_name=($1)'
          const resultInfo = await conn.query(sql_GetInfo, [full_name])
          return resultInfo.rows[0]
        }
      }

      conn.release()
      return null
    } catch (err) {
      throw new Error(`Could not Login : ${full_name}. Error: ${err}`)
    }
  }
}
