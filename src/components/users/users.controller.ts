import * as express from 'express'
import { userDAL } from './users.DAL'
import { User } from './users.model'

class UserController {
    getAllUsers = (res: express.Response) => {
        userDAL.getAllUsers(res)
    }

    getUser = (req: express.Request, res: express.Response) => {
        let id = req.params.id
        
        userDAL.getUser(id, res)
    }

    saveUser = (req: express.Request, res: express.Response) => {
        let user = req.body
        userDAL.saveUser(user, res)
    }
}

export const userController = new UserController()