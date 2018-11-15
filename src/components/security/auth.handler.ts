import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { User } from '../users/users.model'
import { environment } from '../../config/environment'

export const authenticate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { email, password } = req.body

    User.findByEmail(email, '+password')
        .then(user => {
            if(user && user.matches(password)){
                const token = jwt.sign({sub: user.email, iss: 'moovie-api'}, environment.security.secret)

                return res.json({name: user.name, email: user.email, acessToken: token})
            }else{
                return res.status(401).json({message: 'Invalid Credentials.'})
            }
        }).catch(next)
}