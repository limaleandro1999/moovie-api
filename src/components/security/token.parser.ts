import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { environment } from '../../config/environment'
import { User } from '../users/users.model';

export const tokenParser: express.RequestHandler = (req: express.Request, res: express.Response, next:express.NextFunction) => {    
    const token = extractToken(req)

    if(token){
        jwt.verify(token, environment.security.secret, applyBearer(req, next))
    }else{
        next()
    }
}

function extractToken(req: express.Request){
    let token = undefined
    const authorization = req.header('authorization')

    if(authorization){
        const parts: string[] = authorization.split(' ')

        if(parts.length === 2 && parts[0] === 'Bearer'){
            token = parts[1]
        }

        return token
    }
}

function applyBearer(req, next): (error, decoded) => void {
    return (error, decoded) => {
        if(decoded){
            User.findByEmail(decoded.sub).then(user => {
                if(user){
                    req.authenticated = user 
                }

                next()
            }).catch(next)
        }else{
            next()
        }
    }
}