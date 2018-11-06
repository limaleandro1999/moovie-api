import * as express from 'express'
import { User } from './users.model'
import { errorHandler } from '../common/error.handler'
import * as mongoose from 'mongoose';

class UserController {
    getAllUsers = (res: express.Response) => {
        User.find()
            .then(users => {
                res.status(200).json(users)
            }).catch(err => {
                res.status(500).json({message: 'Sorry, we had a problem.'})
            })
    }

    getUser = (id, res: express.Response) => {
        if(mongoose.Types.ObjectId.isValid(id)){
            User.findById(id)
                .then(user => {
                    res.status(200).json(user)
                }).catch(err => {
                    res.status(500).json({message: 'Sorry, we had a problem.'})
                })
        }else{
            res.status(404).json({message: 'Document not found'})
        }
    }

    saveUser = (req: express.Request, res: express.Response) => {
        let user = new User(req.body)
        
        user.save()
            .then(user => {
                user.password = undefined
                res.status(200).json(user)
            }).catch(error => {
                errorHandler(res, error)
                res.status(error.statusCode).json(error)
            })
    }

    replaceUser = (req: express.Request, res: express.Response) => {
        const options = {runValidators: true, overwrite: true}

        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            User.findOneAndUpdate({_id: req.params.id}, req.body, options)
                .then(result => {
                    res.status(200).json(result)
                }).catch(error => {
                    console.log(error)
                    errorHandler(res, error)
                    res.status(error.statusCode).json(error)
                })
        }else{
            res.status(404).json({message: 'Document not found'}) 
        }
    }

    updateUser = (req: express.Request, res: express.Response) => {
        const options = {runValidators: true, new: true}

        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            User.findOneAndUpdate({_id: req.params.id}, req.body, options)
                .then(result => {
                    res.status(200).json(result)
                }).catch(error => {
                    console.log(error)
                    errorHandler(res, error)
                    res.status(error.statusCode).json(error)
                })
        }else{
            res.status(404).json({message: 'Document not found'}) 
        }
    }
}

export const userController = new UserController()