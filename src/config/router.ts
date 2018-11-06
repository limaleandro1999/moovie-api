import * as express from 'express'
import { userRouter } from '../components/users/users.router'

export const router = (app: express.Application) => {
    app.use('/api/users', userRouter)
}