import Client from '../database'
import { Order } from '../types/types'

export class OrderModel {
  // create show all
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders'

      const result = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not get order. Error: ${err}`)
    }
  }

  // show one , filter with id
  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)'
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }

  async create(b: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (total, user_id) VALUES($1,$2) RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [b.total, b.user_id])

      const user = result.rows[0]

      conn.release()

      return user
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`)
    }
  }

  async addProduct(
    quantity: number,
    orderID: number,
    productID: number,
    price: number,
    total_price: number
  ): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders_products (order_id, product_id, quantity, price, total_price) VALUES($1,$2,$3,$4,$5) RETURNING *'
      const conn = await Client.connect()

      const result = await conn.query(sql, [
        orderID,
        productID,
        quantity,
        price,
        total_price,
      ])

      const _order = result.rows[0]

      conn.release()

      return _order
    } catch (err) {
      throw new Error(
        `Could not add  product ${productID} to order ${orderID}. Error: ${err}`
      )
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const conn = await Client.connect()
      const sql1 = 'DELETE FROM orders_products WHERE order_id=($1)'
      await conn.query(sql1, [id])
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *'
      const result = await conn.query(sql, [id])
      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`)
    }
  }
}
