import * as express from 'express'
import { Review } from './reviews.model';

class ReviewController {
    getReviewsByUserId = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if(req.query.userId){
            let reviews = await Review.find({user: req.query.userId}).catch(error => {
                return res.status(500).json({message: 'Sorry, we had a problem.'})
            })

            return res.status(200).json(reviews)
        }else{
            next()
        }
    }

    getReviewsByMovieId = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if(req.query.movieId){
            let reviews = await Review.find({movie: req.query.movieId}).catch(error => {
                return res.status(500).json({message: 'Sorry, we had a problem.'})
            })

            return res.status(200).json(reviews)
        }else{
            next()
        }
    }

    getReviewById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if(req.params.id){
            let review = await Review.findById(req.params.id).catch(error => {
                return res.status(500).json({message: 'Sorry, we had a problem.'})
            })

            return res.status(200).json(review)
        }else{
            next()
        }
        
    }

    getReviews = async (req: express.Request, res: express.Response) => {
        let reviews = await Review.find().catch(error => {
            return res.status(500).json({message: 'Sorry, we had a problem.'})
        })

        return res.status(200).json(reviews)
    }

    saveReviews = async(req: express.Request, res: express.Response) => {
        let review = new Review(req.body)

        review.save().catch(error => {
            return res.status(500).json({message: 'Sorry, we had a problem.'})
        })

        return res.status(200).json(review)
    }
}

export const reviewController = new ReviewController()