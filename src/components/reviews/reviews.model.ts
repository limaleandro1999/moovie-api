import * as mongoose from 'mongoose'
import * as omdbConsumer from '../../services/omdb.api.consumer'
import { User } from '../users/users.model'

export interface Review extends mongoose.Document{
    comment: string,
    rating: number,
    user: mongoose.Schema.Types.ObjectId | User,
    movie: string  //The omdb API return the movie id as a string
}

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        maxlength: 1000
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: String,
        required: true
    }
})

const showMovieAndUseMiddleware = async function (reviews){  
    for(let i = 0; i < reviews.length; i++){
        reviews[i].user = await User.findById(reviews[i].user)
        reviews[i].movie = JSON.stringify(await omdbConsumer.getMovieById(reviews[i].movie))
    }
}

reviewSchema.post('find', showMovieAndUseMiddleware)

export const Review = mongoose.model<Review>('Review', reviewSchema)

