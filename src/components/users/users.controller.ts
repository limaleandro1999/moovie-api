import * as express from 'express'
import * as mongoose from 'mongoose'
import { User } from './users.model'
import { errorHandler } from '../common/error.handler'


class UserController {
    getAllUsers = async (req: express.Request, res: express.Response) => {
        let users = await User.find().catch(error => {
            return res.status(500).json({message: 'Sorry, we had a problem.'})
        })
        
        return res.status(200).json(users)
    }

    getUser = async (req: express.Request, res: express.Response) => {
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            let user = await User.findById(req.params.id).catch(error => {
                return res.status(500).json({message: 'Sorry, we had a problem.'})
            })

            return res.status(200).json(user)
        }else{
            return res.status(404).json({message: 'Document not found'})
        }
    }

    saveUser = async (req: express.Request, res: express.Response) => {
        let user = await User.create(req.body).catch(error => {
            errorHandler(error)
            return res.status(error.statusCode).json(error)
        })

        return res.send(user)
    }

    replaceUser = async (req: express.Request, res: express.Response) => {
        const options = {runValidators: true, overwrite: true}

        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            let user = await User.findOneAndUpdate({_id: req.params.id}, req.body, options).catch(error => {
                errorHandler(error)
                return res.status(error.statusCode).json(error) 
            })

            return res.status(200).json(user)
        }else{
            res.status(404).json({message: 'Document not found'}) 
        }
    }

    updateUser = async (req: express.Request, res: express.Response) => {
        const options = {runValidators: true, new: true}

        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            let user = await User.findOneAndUpdate({_id: req.params.id}, req.body, options).catch(error => {
                errorHandler(error)
                return res.status(error.statusCode).json(error) 
            })

            return res.status(200).json(user)
        }else{
            res.status(404).json({message: 'Document not found'}) 
        }
    }
}

export const userController = new UserController()