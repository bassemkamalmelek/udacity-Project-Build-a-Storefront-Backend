import supertest from 'supertest'
import app from '../server'

const request = supertest(app)

describe('Test basic endpoint server', () => {
  it('Get the / endpont', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})
