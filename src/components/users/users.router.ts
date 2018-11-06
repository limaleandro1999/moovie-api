import * as express from 'express'
import {userController} from './users.controller'

const router: express.Router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
    userController.getAllUsers(res)
})

router.get('/:id', (req: express.Request, res: express.Response) => {
    let id = req.params.id

    userController.getUser(id, res)
})

router.post('/', (req: express.Request, res: express.Response) => {
    userController.saveUser(req, res)
})

router.put('/:id', (req: express.Request, res: express.Response) => {
    userController.replaceUser(req, res)
})

router.patch('/:id', (req: express.Request, res: express.Response) => {
    userController.updateUser(req, res)
})

export const userRouter: express.Router = router