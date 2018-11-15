import * as express from 'express'
import {userController} from './users.controller'

const router: express.Router = express.Router()

router.get('/', [userController.getUserByEmail, userController.getAllUsers])
router.get('/:id', userController.getUser)
router.post('/', userController.saveUser)
router.put('/:id', userController.replaceUser)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export const userRouter: express.Router = router