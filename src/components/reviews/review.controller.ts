import * as express from 'express'
import * as mongoose from 'mongoose'
import { Review } from './reviews.model'
import { errorHandler } from '../common/error.handler'

class ReviewController {
    getReviewsByUserId = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if(req.query.userId){
            let reviews = await Review.findByUserId(req.query.userId).catch(error => {
                return res.status(500).json({message: 'Sorry, we had a problem.'})
            })

            if(reviews != null){
                return res.status(200).json(reviews)
            }

            return res.status(404).json({message: 'Document not found'})
        }else{
            next()
        }
    }

    getReviewsByMovieId = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if(req.query.movieId){
            let reviews = await Review.findByMovieId(req.query.movieId).catch(error => {
                return res.status(500).json({message: 'Sorry, we had a problem.'})
            })

            if(reviews != null){
                return res.status(200).json(reviews)
            }

            return res.status(404).json({message: 'Document not found'})
        }else{
            next()
        }
    }

    getReviewById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if(req.params.id){
            let review = await Review.findById(req.params.id).catch(error => {
                return res.status(500).json({message: 'Sorry, we had a problem.'})
            })

            if(review != null){
                return res.status(200).json(review)
            }

            return res.status(404).json({message: 'Document not found'})
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

    saveReviews = async (req: express.Request, res: express.Response) => {
        let review = new Review(req.body)

        review.save().catch(error => {
            return res.status(500).json({message: 'Sorry, we had a problem.'})
        })

        return res.status(200).json(review)
    }

    replaceReview = async (req: express.Request, res: express.Response) => {
        const options = {runValidators: true, overwrite: true}

        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            let user = await Review.findOneAndUpdate({_id: req.params.id}, req.body, options).catch(error => {
                errorHandler(error)
                return res.status(error.statusCode).json(error) 
            })

            if(user != null){
                return res.status(200).json(user)
            }  
        }

        return res.status(404).json({message: 'Document not found'}) 
    }

    updateReview = async (req: express.Request, res: express.Response) => {
        const options = {runValidators: true, new: true}

        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            let user = await Review.findOneAndUpdate({_id: req.params.id}, req.body, options).catch(error => {
                errorHandler(error)
                return res.status(error.statusCode).json(error) 
            })

            if(user != null){
                return res.status(200).json(user)
            }  
        }

        return res.status(404).json({message: 'Document not found'})
    }

    deleteReview = async (req: express.Request, res: express.Response) => {
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            await Review.findByIdAndDelete(req.params.id)
                .then((cmdResult: any) => {
                    if(cmdResult){
                        return res.status(204).json({message: 'Review deleted'})
                    }
                }).catch(error => {
                    errorHandler(error)
                    return res.status(error.statusCode).json(error) 
                })
        }

        return res.status(404).json({message: 'Document not found'})
    }
}

export const reviewController = new ReviewController()