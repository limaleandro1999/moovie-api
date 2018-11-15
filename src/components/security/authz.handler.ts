import * as express from 'express'

export const authorize = (req, res, next) => {
    if(req.authenticated){
        next()
    }else{
        res.status(403).json({message: 'You need to be authenticated'})
    }
}