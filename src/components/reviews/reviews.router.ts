import * as express from 'express'
import { reviewController } from './review.controller'
import { authorize } from '../security/authz.handler'

const router: express.Router = express.Router()

router.get('/', [
    reviewController.getReviewsByUserId, 
    reviewController.getReviewsByMovieId, 
    reviewController.getReviews
])
router.get('/:id', reviewController.getReviewById)
router.post('/', [authorize, reviewController.saveReviews])
router.patch('/:id', [authorize, reviewController.updateReview])
router.put('/:id', [authorize, reviewController.replaceReview])
router.delete('/:id', [authorize, reviewController.deleteReview])

export const reviewRouter = router
