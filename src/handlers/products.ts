import express, { Request, Response } from 'express'
import { ProductModel } from '../models/product'
import { Product } from '../types/types'
import { validateTokenMiddleware } from '../middleware/authentication'

const product = new ProductModel()

const index = async (_req: Request, res: Response) => {
  const _product = await product.index()
  res.json(_product)
}

const show = async (req: Request, res: Response) => {
  const _product = await product.show(req.params.id)

  res.json(_product)
}

const create = async (req: Request, res: Response) => {
  try {
    const _product: Product = {
      product_name: req.body.product_name,
      price: req.body.price,
    }
    const newProduct = await product.create(_product)
    res.json(newProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const update = async (req: Request, res: Response) => {
  try {
    const _product: Product = {
      id: req.params.id as unknown as number,
      product_name: req.body.product_name,
      price: req.body.price,
    }
    const newProduct = await product.update(_product)
    res.json(newProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await product.delete(req.body.id)
  res.json(deleted)
}

const productsRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', validateTokenMiddleware, create)
  app.put('/products/:id', validateTokenMiddleware, update)
  app.delete('/products', validateTokenMiddleware, destroy)
}

export default productsRoutes
