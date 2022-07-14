import express, { Request, Response } from 'express'
import { Database } from '../models/createDB'

const db = new Database()

const setupDB = async (req: Request, res: Response) => {
  const db_r = await db.setupDatabase()
  res.json(db_r)
}

const dbRoutes = (app: express.Application) => {
  app.post('/setupdb', setupDB)
}

export default dbRoutes
