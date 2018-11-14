import * as express from 'express'
import { userRouter } from '../components/users/users.router'
import { movieRouter } from '../components/movies/movies.router'
import { reviewRouter } from '../components/reviews/reviews.router'

export const router = (app: express.Application) => {
    app.use('/api/users', userRouter)
    app.use('/api/movies', movieRouter)
    app.use('/api/reviews', reviewRouter)
}