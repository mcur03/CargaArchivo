import bcrypt from 'bcrypt';
import Medico from '../dto/medicoDto';
import db from '../config/db';
import { RowDataPacket } from 'mysql2';

class MedicoRepository{
    static async registrarMedico(medico: Medico): Promise<void>{
        const { email, nombre, pass} = medico;
        const hashPass = await bcrypt.hash(pass, 10);
        await db.query('INSERT INTO medico(email, nombre, pass) VALUES(?,?,?)',
            [ email, nombre, hashPass]);
    }

    static async loginMedico(email:string, pass:string){
        const [ rows ] = await db.query<RowDataPacket[]>('SELECT * FROM medico WHERE email = ?', [email]);
        
        if(rows.length > 0){
            const user = rows[0] as {pass: string} 
            const match = await bcrypt.compare(pass, user.pass)
            return match? user:null
        }
    }

}

export default MedicoRepository;