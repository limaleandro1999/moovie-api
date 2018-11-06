import * as express from 'express'
import { errorHandler } from '../common/error.handler'
import { User } from './users.model'

class UserDAL {
    getAllUsers = (res: express.Response) => {
        User.find()
            .exec()
            .then(users => {
                res.status(200).json(users)
            }).catch(err => {
                console.error(err)
                res.status(500).json({msg: 'Sorry, we had a problem.'})
            })
    }

    getUser = (id, res: express.Response) => {
        User.findById(id)
            .exec()
            .then(user => {
                res.status(200).json(user)
            }).catch(err => {
                console.error(err)
                res.status(500).json({msg: 'Sorry, we had a problem.'})
            })
    }

    saveUser = (user: User, res: express.Response) => {
        let document = new User(user)
        
        document.save()
                .then(user => {
                    user.password = undefined
                    res.status(200).json(user)
                }).catch(error => {
                    console.log(errorHandler(res, error))
                    res.status(error.statusCode).json(error)
                })
    }
}

export const userDAL = new UserDAL()