import { Request, Response } from "express"
import { router } from "./app/routes"
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

export const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use('api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Ride Booking Application')
})