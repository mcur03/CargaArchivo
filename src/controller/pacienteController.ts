import {Request, Response} from 'express';
import Paciente from '../dto/pacienteDto';
import PacienteRepository from '../repositories/pacienteRepository';
import path from 'path';
import fs from 'fs';

class PacienteController{
    static async create(req:Request, res:Response){
        try {
            const paciente:Paciente = req.body
            await PacienteRepository.createPaciente(paciente);
            return res.status(201).json({
                messge: 'Paciente registrado correctamente',
                paciente: paciente
            });
        } catch (error) {
            console.error('Error al registrar el usuario', error);
            return res.status(500).json([{Error: error}]);
        }
    }

    static async descargar(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const pacienteId = Number(id);
    
            if (isNaN(pacienteId)) {
                return res.status(400).send('ID de paciente inválido');
            }
    
            // Consulta la información del paciente
            const paciente = await PacienteRepository.descargarInforme(pacienteId);
    
            if (!paciente) {
                return res.status(404).send('Paciente no encontrado');
            }
    
            // Crea el contenido del archivo
            const content = 
                `INFORME DEL PACIENTE\n\n` + 
                `Nombre: ${paciente.nombre}\n` + 
                `Apellido: ${paciente.apellido}\n` + 
                `Edad: ${paciente.edad}\n` + 
                `Tipo de Sangre: ${paciente.tipoSangre}\n` + 
                `Enfermedades: ${paciente.enfermedades || 'Ninguna'}\n` + 
                `Alergia: ${paciente.alergias || 'Ninguna'}\n`
            ;
    
            const publicDir = path.resolve(__dirname, '../../public');
            if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir);
            }
        
            // Define la ruta del archivo
            const filePath = path.join(publicDir, 'paciente.txt');
    
            // Escribe el archivo en el disco
            fs.writeFile(filePath, content, (err) => {
                if (err) {
                    console.error('Error al crear el archivo:', err);
                    return res.status(500).send('Error al crear el archivo');
                }
    
                // Envia el archivo al usuario
                res.download(filePath, 'paciente.txt', (err) => {
                    if (err) {
                        console.error('Error al descargar el archivo:', err);
                        res.status(500).send('Error al descargar el archivo');
                    }
                });
            });
        } catch (error) {
            res.status(500).send('Error en el servidor');
        }
    }

    static async editar(req:Request, res:Response){
        try {
            const paciente: Paciente = req.body;
            const { id }= req.params;
            if(!id){
                return res.status(404).json({message: 'El id es obligatorio para editar'})
            }
            await PacienteRepository.editarPaciente(paciente, Number(id));
            return res.status(200).json({
                message:'Editado correctamente',
                paciente
            })
        } catch (error) {
            console.error('Error al actualizar el paciente', error);
            return res.status(500).json({message: 'Error al editar al paciente'})
        }

    }
    
}

export default PacienteController;