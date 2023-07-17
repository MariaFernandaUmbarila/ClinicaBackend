import { Patient, PatientReq } from './model';
import { db } from '../../../config/database';
import { GetAllError, GetByIdError, CreateError, UpdateError, DeleteError } from '../../../utils/customerrors';


//No implementa ninguna otra clase, es como una clase 'raiz'
export class PatientRepository{

    //Lista todos los pacientees
    public async getAllPatients(): Promise<Patient[]>{
        try{
            //Retorna una variable de tipo any
            return db.select('*').from('pacientes');
        }catch(error){
            throw new GetAllError("Patient");
        }
    }

    //Lista la información de un paciente dado el id
    public async getPatientById(id:number): Promise<Patient>{
        try{
            //Búsqueda del paciente por id, es manejado como objeto
            const patient = await db('pacientes').where({paci_id: id}).first();
            return patient;
        }catch(error){
            throw new GetByIdError("Patient");
        }
    }

    //Crea un paciente en base de datos
    public async createPatient(patient:PatientReq): Promise<Patient>{
        try{
            //Retorna una variable de tipo any
            const [createdPatient] = await db('pacientes').insert(patient).returning('*');
            return createdPatient;
        }catch(error){
            throw new CreateError("Patient");
        }
    }

    //Actualiza un paciente en base de datos, se pasa la información parcial del paciente
    public async updatePatientById(id:number, updates:Partial<PatientReq>): Promise<void>{
        try{
            //Búsqueda del paciente por id, es manejado como objeto
            await db('pacientes').where({paci_id: id}).update(updates);
        }catch(error){
            throw new UpdateError("Patient");
        }
    } 
    
    //Borra el registro en base de datos dado el id
    public async deletePatientById(id:number): Promise<void>{
        try{
            //Búsqueda del paciente por id, es manejado como objeto
            await db('pacientes').where({paci_id: id}).del();
        }catch(error){
            throw new DeleteError("Patient");
        }
    } 
}