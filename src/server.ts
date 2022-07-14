import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import usersRoutes from './handlers/users'
import productsRoutes from './handlers/products'
import ordersRoutes from './handlers/orders'
import dbRoutes from './handlers/createDB'
import { listenerCount } from 'process'

const app: express.Application = express()
const address = '127.0.0.1:3000'

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!')
})

usersRoutes(app)
productsRoutes(app)
ordersRoutes(app)
dbRoutes(app)

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})

// write new func
 


export default app
