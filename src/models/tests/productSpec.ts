import { ProductModel } from '../product'
import { Product } from '../../types/types'
import Client from '../../database'

const product = new ProductModel()

describe('Product Model', () => {
  const _product = {
    id: 1,
    product_name: 'Milk',
    price: '70.5555',
  } as Product

  beforeAll(async () => {
    const result = await product.create(_product)
    _product.id = parseInt(result.id as unknown as string, 10) + 1
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

  const _product_Milk = {
    id: 2,
    product_name: 'Tea',
    price: '70.5555',
  } as Product

  it('create method should add a product', async () => {
    const result = await product.create(_product_Milk)
    expect(result).toEqual(_product_Milk)
  })

  it('index method should return a list/count of product', async () => {
    const result = await product.index()
    expect(result.length).toBe(2)
  })

  it('show method should return the correct product', async () => {
    const result = await product.show('2')
    expect(result).toEqual(_product_Milk)
  })

  const _product_update = {
    id: 2,
    product_name: 'Tea',
    price: '75.5555',
  } as Product

  it('Update method should edit the user details', async () => {
    const result = await product.update(_product_update)
    expect(result.price).toEqual('75.5555')
  })

  it('delete method should remove the product', async () => {
    const result = await product.delete('2')
    expect(result).toEqual(_product_update)
  })

  afterAll(async () => {
    const conn = await Client.connect()

    const sql_dl = 'DELETE FROM products;'
    await conn.query(sql_dl)

    const sql = 'ALTER SEQUENCE products_id_seq RESTART WITH 1;'
    await conn.query(sql)
    conn.release()
  })
})
