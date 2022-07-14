import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user'
import { User } from '../types/types'
import configs from '../config'
import { validateTokenMiddleware } from '../middleware/authentication'

const user = new UserModel()

/* const resetAutoIncrement = async (_req: Request, res: Response) => {
  const _user = await user.resetAutoIncrement()
  res.json(_user)
} */

const index = async (_req: Request, res: Response) => {
  const _user = await user.index()
  res.json(_user)
}

const show = async (req: Request, res: Response) => {
  const _user = await user.show(req.params.id)
  res.json(_user)
}

const create = async (req: Request, res: Response) => {
  try {
    const _user: User = {
      full_name: req.body.full_name,
      password: req.body.password,
    }
    const newUser = await user.create(_user)
    res.json(newUser)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const _user: User = {
      id: req.params.id as unknown as number,
      full_name: req.body.full_name,
      password: req.body.password,
    }
    const newUser = await user.update(_user)
    res.json(newUser)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const destroy = async (req: Request, res: Response) => {
  const deleted = await user.delete(req.body.id)
  res.json(deleted)
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _auth = await user.authenticate(req.body.full_name, req.body.password)
    const token = jwt.sign({ _auth }, configs.tokenSecret as unknown as string)
    if (!_auth) {
      return res.status(401).json({
        status: 'error',
        message: 'the username or password not correct, please try again.',
      })
    }
    return res.json({
      status: 'success',
      data: { _auth, token },
      message: 'user authenticated successfully.',
    })
  } catch (error) {
    return next(error)
  }
}

const usersRoutes = (app: express.Application) => {
  app.get('/users', validateTokenMiddleware, index)
  app.get('/users/:id', validateTokenMiddleware, show)
  app.post('/users', create)
  app.put('/users/:id', update)
  app.delete('/users', validateTokenMiddleware, destroy)
  app.post('/authenticate', authenticate)
}

export default usersRoutes
