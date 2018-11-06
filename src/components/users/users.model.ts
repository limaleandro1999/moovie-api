import * as mongoose from 'mongoose'

export interface User extends mongoose.Document{
    name: string,
    email: string,
    password: string,
    bio: string
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //Regex expression to valid email
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    bio: {
        type: String,
        required: false,
        maxlength: 500
    }
})

export const User = mongoose.model<User>('User', userSchema)