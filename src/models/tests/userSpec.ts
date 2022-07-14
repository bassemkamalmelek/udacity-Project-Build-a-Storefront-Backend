import { UserModel } from '../user'
import { User } from '../../types/types'
import Client from '../../database'

const user = new UserModel()
let userID = 1

describe('User Model', () => {
  const _user = {
    id: 1,
    full_name: 'Bassem',
    password: '123',
  } as User

  beforeAll(async () => {
    const result = await user.create(_user)
    _user.id = result.id
    userID = parseInt(result.id as unknown as string, 10) + 1
  })

  it('should have an index method', () => {
    expect(user.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(user.index).toBeDefined()
  })

  it('should have a create method', () => {
    expect(user.index).toBeDefined()
  })

  it('should have a update method', () => {
    expect(user.index).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(user.index).toBeDefined()
  })

  const _user2 = {
    id: userID,
    full_name: 'Jessy',
    password: '123',
  } as User

  it('create method should add a user', async () => {
    const result = await user.create(_user2)
    expect(result.id).toEqual(2)
  })

  it('index method should return a list/count of users', async () => {
    const result = await user.index()
    expect(result.length).toBe(2)
  })

  it('show method should return the correct user', async () => {
    const result = await user.show(2 as unknown as string)
    expect(result.full_name).toEqual('Jessy')
  })

  const _user2_update = {
    id: userID,
    full_name: 'Jessy Max',
    password: '123',
  } as User

  it('Update method should edit the user details', async () => {
    const result = await user.update(_user2_update)
    expect(result.full_name).toEqual('Jessy Max')
  })

  it('delete method should remove the user', async () => {
    const result = await user.delete(userID as unknown as string)
    expect(result).toBeUndefined
  })

  afterAll(async () => {
    const conn = await Client.connect()

    const sql_dl = 'DELETE FROM users;'
    await conn.query(sql_dl)

    const sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    await conn.query(sql)
    conn.release()
  })
})
