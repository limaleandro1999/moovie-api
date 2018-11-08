import * as express from 'express'
import * as omdbConsumer from '../../services/omdb.api.consumer'

class MovieController{
    getMovieByTitle = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if(req.query.title){
            let movie = await omdbConsumer.getMovieByTitle(req.query.title)
            return res.status(200).json(movie)
        }else{
            next()
        }
    }

    getMoviesBySearch = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if(req.query.search){
            let movies = await omdbConsumer.getMoviesBySearch(req.query.search)
            return res.status(200).json(movies)
        }else{
            next()
        }
    }
}

export const movieController = new MovieController()