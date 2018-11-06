import * as express from 'express'
import {userController} from './users.controller'

const router: express.Router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
    userController.getAllUsers(res)
})

router.get('/:id', (req: express.Request, res: express.Response) => {
    userController.getUser(req, res)
})

router.post('/', (req: express.Request, res: express.Response) => {
    userController.saveUser(req, res)
})

export const userRouter: express.Router = router