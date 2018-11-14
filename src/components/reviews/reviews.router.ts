import * as express from 'express'
import { reviewController } from './review.controller'

const router: express.Router = express.Router()

router.get('/', [
    reviewController.getReviewsByUserId, 
    reviewController.getReviewsByMovieId, 
    reviewController.getReviews
])
router.get('/:id', reviewController.getReviewById)
router.post('/', reviewController.saveReviews)

export const reviewRouter = router
