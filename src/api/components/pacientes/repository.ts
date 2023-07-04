import { Patient, PatientReq } from './model';
import { db } from '../../../config/database';

export class PatientRepository{

    public async getAllPatients(): Promise<Patient[]>{
        try{
            //Retorna una variable de tipo any
            return db.select('*').from('pacientes');
        }catch(error){
            throw new Error(`Error consultando pacientes: ${error}`);
        }
    }

    //Retorna una promesa por lo que es una función async
    public async createPatient(patient:PatientReq): Promise<Patient>{
        try{
            //Retorna una variable de tipo any
            const [createdPatient] = await db('pacientes').insert(patient).returning('*');
            return createdPatient;
        }catch(error){
            throw new Error(`Error creando al paciente: ${error}`);
        }
    }
}