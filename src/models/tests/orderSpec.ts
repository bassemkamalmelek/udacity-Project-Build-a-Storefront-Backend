import { OrderModel } from '../order'
import { UserModel } from '../user'
import { ProductModel } from '../product'
import { Order, Product, User } from '../../types/types'
import Client from '../../database'

const product = new ProductModel()
const user = new UserModel()
const order = new OrderModel()

let productID = 1
let userID = 1

describe('Order Model', () => {
  const _product = {
    id: 1,
    product_name: 'Milk',
    price: '70.5555',
  } as Product

  const _user = {
    id: 1,
    full_name: 'Bassem',
    password: '123',
  } as User

  beforeAll(async () => {
    const _addUroduct = await product.create(_product)
    productID = parseInt(_addUroduct.id as unknown as string, 10)

    const _addUser = await user.create(_user)
    userID = parseInt(_addUser.id as unknown as string, 10)
  })

  it('should have an index method', () => {
    expect(product.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(product.index).toBeDefined()
  })

  it('should have a create method', () => {
    expect(product.index).toBeDefined()
  })

  it('should have a update method', () => {
    expect(product.index).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(product.index).toBeDefined()
  })

  const _order1 = {
    id: 1,
    total: '70.5555',
    user_id: userID as unknown as string,
  } as Order

  it('create method should add a order', async () => {
    const result = await order.create(_order1)
    expect(result).toEqual(_order1)
  })

  it('create method should add a product to order', async () => {
    const result = await order.addProduct(1, 1, productID, 70.5555, 70.5555)
    expect(result.id).toBe(1)
  })

  it('index method should return a list/count of order', async () => {
    const result = await order.index()
    expect(result.length).toBe(1)
  })

  it('show method should return the correct order', async () => {
    const result = await order.show('1')
    expect(result).toEqual(_order1)
  })

  it('delete method should remove the order', async () => {
    const result = await order.delete('1')
    expect(result).toEqual(_order1)
  })

  afterAll(async () => {
    const conn = await Client.connect()

    const sql_dl =
      'DELETE FROM orders_products; DELETE FROM orders; DELETE FROM products; DELETE FROM users;'
    await conn.query(sql_dl)

    const sql =
      'ALTER SEQUENCE orders_products_id_seq RESTART WITH 1; ALTER SEQUENCE orders_id_seq RESTART WITH 1; ALTER SEQUENCE products_id_seq RESTART WITH 1; ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    await conn.query(sql)
    conn.release()
  })
})
