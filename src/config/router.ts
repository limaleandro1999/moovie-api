import * as express from 'express'
import { userRouter } from '../components/users/users.router'
import { movieRouter } from '../components/movies/movies.router'

export const router = (app: express.Application) => {
    app.use('/api/users', userRouter)
    app.use('/api/movies', movieRouter)
}