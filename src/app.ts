import { Request, Response } from "express"
import { router } from "./app/routes"
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { globalErrorHandle } from "./app/middlewares/globalErrorHandler"
import './app/config/passport'
import passport from "passport"
import expressSession from 'express-session'
import { envVars } from "./app/config/env"
export const app = express()

app.use(expressSession({
  secret: envVars.EXPIRES_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: envVars.FRONTEND_URL,
    credentials: true
}))

app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Ride Booking Application')
})

app.use(globalErrorHandle)