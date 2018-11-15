import * as express from 'express'
import { userController } from './users.controller'
import { authenticate } from '../security/auth.handler'
import { authorize } from '../security/authz.handler'

const router: express.Router = express.Router()

router.get('/', [userController.getUserByEmail, userController.getAllUsers])
router.get('/:id', userController.getUser)
router.post('/', userController.saveUser)
router.put('/:id', [authorize, userController.replaceUser])
router.patch('/:id', [authorize, userController.updateUser])
router.delete('/:id', [authorize, userController.deleteUser])

router.post('/authenticate', authenticate)

export const userRouter: express.Router = router