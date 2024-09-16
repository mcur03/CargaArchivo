import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export function validateToken(req:Request, res:Response, next:NextFunction){
    const tokens = req.header('Authorization')?.split(' ')[1];

    if(!tokens){
        return res.status(401).json({message: 'Acceso denegado'})
    }
    jwt.verify(tokens as string, process.env.JWT_SECRET as string, (err)=>{
        if(err){
            console.error('Acceso denegrado o token incorrecto');
            return res.status(401).json({message: 'Acceso denegrado o token incorrecto'});
        }else{
            next()
        }
    });
}