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

    getMoviesByPage = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if(req.query.page){
            let movies = await omdbConsumer.getMoviesByPage(req.query.page)
            return res.status(200).json(movies)
        }else{
            next()
        }
    }

    getMovies = async (req: express.Request, res: express.Response) => {
        let movies = await omdbConsumer.getMoviesByPage(1)
        return res.status(200).json(movies)
    }
}

export const movieController = new MovieController()