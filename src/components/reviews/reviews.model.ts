import * as mongoose from 'mongoose'
import * as omdbConsumer from '../../services/omdb.api.consumer'
import { User } from '../users/users.model'

export interface Review extends mongoose.Document{
    comment: string,
    rating: number,
    user: mongoose.Schema.Types.ObjectId | User,
    movie: string  //The omdb API return the movie id as a string
}

export interface ReviewModel extends mongoose.Model<Review>{
    findByUserId(userId: mongoose.Schema.Types.ObjectId): Promise<Review>
    findByMovieId(movieId: string): Promise<Review>
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

reviewSchema.statics.findByUserId = function (userId: mongoose.Schema.Types.ObjectId){
    return this.find({user: userId})
}

reviewSchema.statics.findByMovieId = function (movieId: string){
    return this.find({movie: movieId})
}

export const Review = mongoose.model<Review, ReviewModel>('Review', reviewSchema)

