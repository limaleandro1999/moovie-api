import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'
import { environment } from '../../config/environment'

export interface User extends mongoose.Document{
    name: string,
    email: string,
    password: string,
    bio: string
}

export interface UserModel extends mongoose.Model<User>{
    findByEmail(email: string): Promise<User>
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

userSchema.statics.findByEmail = function(email: string) {
    return this.findOne({email: email})
}

const hashParser = (obj, next) => {
    bcrypt.hash(obj.password, environment.security.salt_rounds)
          .then(hash => {
              obj.password = hash
              next()
          }).catch(next)
}

const saveMiddleware = function(next){
    const user: User = this

    if(!user.isDirectModified('password')){
        next()
    }else{
        hashParser(this, next)
    }
}

const updateMiddleware = function(next){
    if(!this.getUpdate().password){
        next()
    }else{
        hashParser(this.getUpdate(), next)
    }
}

const hidePasswordMiddleware = function(doc){
    doc.password = undefined
}

userSchema.pre('save', saveMiddleware)
userSchema.post('save', hidePasswordMiddleware)
userSchema.pre('findOneAndUpdate', updateMiddleware)

export const User = mongoose.model<User, UserModel>('User', userSchema)