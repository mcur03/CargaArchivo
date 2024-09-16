import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';

import Medico from '../dto/medicoDto';
import MedicoRepository from '../repositories/medicoRepository';


class MedicoController{
    static async registrar(req:Request, res:Response){
        try {
            const medico:Medico = req.body
            await MedicoRepository.registrarMedico(medico);
            return res.status(201).json({
                message: 'Registrado correctamente'})
        } catch (error) {
            return res.status(500).json({error: 'no se puedo registrar'})
        }
    }

    static async login(req:Request, res:Response){
        try {
            const { email, pass } = req.body;
            const user = await MedicoRepository.loginMedico(email, pass);

            if(!user){
                console.error('Credenciales incorretas');
                return res.status(401).json({message: 'credenciales incorrectas'})
            }
            const token = jwt.sign({email}, process.env.JWT_SECRET as string , {expiresIn: process.env.JWT_EXPIRES});

            return res.status(200).json({
                message: 'Autenticado',
                token: token
            })
        } catch (error) {
            console.error('Error al autenticarse', error);
            return res.status(500).json({message: 'Error al autenticarse'})
        }
    }
}

export default MedicoController;