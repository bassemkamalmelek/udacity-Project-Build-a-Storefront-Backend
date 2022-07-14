import { UserModel } from '../user'
import { User } from '../../types/types'
import Client from '../../database'

const user = new UserModel()

describe('Authentication Module', () => {
  const _user = {
    id: 1,
    full_name: 'Bassem',
    password: '123',
  } as User

  beforeAll(async () => {
    const result = await user.create(_user)
    _user.id = result.id
  })

  it('should have an index method', () => {
    expect(user.authenticate).toBeDefined()
  })

  it('Test Authentication Logic', async () => {
    const result = await user.authenticate(_user.full_name, _user.password)
    expect(result?.full_name).toBe('Bassem')
  })

  it('Test Wrong Authentication, must return null', async () => {
    const result = await user.authenticate(_user.full_name, '343333333')
    expect(result).toBe(null)
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
