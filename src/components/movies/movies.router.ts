import * as express from 'express'
import { movieController } from './movies.controller'

const router = express.Router()

router.get('/', [movieController.getMovieByTitle, movieController.getMoviesBySearch])

export const movieRouter = router

