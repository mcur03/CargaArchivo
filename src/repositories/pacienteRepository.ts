import { RowDataPacket } from "mysql2";
import db from "../config/db";
import Paciente from '../dto/pacienteDto';

class PacienteRepository{
    static async createPaciente(paciente:Paciente): Promise<void>{
        const {nombre, apellido, edad, tipoSangre, enfermedades, alergias } = paciente;

        db.query('INSERT INTO paciente(nombre, apellido, edad, tipoSangre, enfermedades, alergia) VALUES(?,?,?,?,?,?)',
            [nombre, apellido, edad, tipoSangre, enfermedades, alergias]);
    }
    
    static async descargarInforme(id:number): Promise<Paciente | null>{
        const [ rows ] = await db.query<RowDataPacket[]>('SELECT * FROM paciente WHERE id = ?', [id])
            // Asegúrate de verificar si hay algún resultado
        if (rows.length === 0) {
            return null; // No se encontró el paciente
        }

        return rows[0] as Paciente; // Retorna el primer (y único) resultado      
        }

        static async editarPaciente(paciente:Paciente, id:number): Promise<void>{
            const { nombre, apellido, edad, tipoSangre, enfermedades, alergias } = paciente;
            await db.query('UPDATE paciente SET nombre = ?, apellido = ?, edad = ?, tipoSangre = ?, enfermedades = ?, alergia = ? WHERE id = ?',
                [nombre, apellido, edad, tipoSangre, enfermedades, alergias, id]);
                
        }
}

export default PacienteRepository;