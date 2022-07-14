import express, { Request, Response } from 'express'
import { OrderModel } from '../models/order'
import { Order } from '../types/types'
import { validateTokenMiddleware } from '../middleware/authentication'

const order = new OrderModel()

const index = async (_req: Request, res: Response) => {
  try {
    const _order = await order.index()
    res.json(_order)
  } catch (error) {
    res.status(400)
    res.json(error)
  }
}

const show = async (req: Request, res: Response) => {
  const _order = await order.show(req.params.id)

  res.json(_order)
}

const create = async (req: Request, res: Response) => {
  try {
    const _order: Order = {
      total: req.body.total,
      user_id: req.body.user_id,
    }
    const newOrder = await order.create(_order)
    res.json(newOrder)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const addProduct = async (req: Request, res: Response) => {
  const _orderID: number = parseInt(req.params.id)
  const _productID: number = parseInt(req.body.product_id)
  const _quantity: number = parseInt(req.body.quantity)
  const _price: number = parseInt(req.body.price)
  const _total_price: number = parseInt(req.body.total_price)

  try {
    const addedProduct = await order.addProduct(
      _quantity,
      _orderID,
      _productID,
      _price,
      _total_price
    )
    res.json(addedProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await order.delete(req.body.id)
  res.json(deleted)
}

const ordersRoutes = (app: express.Application) => {
  app.get('/orders', validateTokenMiddleware, index)
  app.get('/orders/:id', validateTokenMiddleware, show)
  app.post('/orders', validateTokenMiddleware, create)
  app.delete('/orders', validateTokenMiddleware, destroy)

  app.post('/orders/:id/products', validateTokenMiddleware, addProduct)
}

export default ordersRoutes
