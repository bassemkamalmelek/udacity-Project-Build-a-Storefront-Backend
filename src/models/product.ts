import Client from '../database'
import { Product } from '../types/types'

export class ProductModel {
  // create show all
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  // show one , filter with id
  async show(id: string): Promise<Product> {
    try {
      // console.log(id)
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  async create(b: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (product_name, price) VALUES($1,$2) RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [b.product_name, b.price])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(
        `Could not add new product ${b.product_name}. Error: ${err}`
      )
    }
  }

  async update(b: Product): Promise<Product> {
    try {
      const sql =
        'UPDATE products SET product_name=$1, price=$2 WHERE id=$3 RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [b.product_name, b.price, b.id])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(
        `Could not update product ${b.product_name}. Error: ${err}`
      )
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`Could not delete peoduct ${id}. Error: ${err}`)
    }
  }
}
