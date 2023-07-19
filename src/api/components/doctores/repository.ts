import { Doctor, DoctorReq } from './model';
import { db } from '../../../config/database';
import { CreateError, DeleteError, GetAllError, GetByIdError, UpdateError } from '../../../utils/customerrors';


//No implementa ninguna otra clase, es como una clase 'raiz'
export class DoctorRepository{

    //Tipo para los errores customizables
    public type:string = "Doctor";

    //Lista todos los doctores
    public async getAllDoctors(): Promise<Doctor[]>{
        try{
            //Retorna una variable de tipo any
            return db.select('*').from('doctores');
        }catch(error){
            throw new GetAllError(this.type);
        }
    }

    //Lista la información de un doctor dado el id
    public async getDoctorById(id:number): Promise<Doctor>{
        try{
            //Búsqueda del doctor por id, es manejado como objeto
            const doctor = await db('doctores').where({doct_id: id}).first();
            return doctor;
        }catch(error){
            throw new GetByIdError(this.type);
        }
    }

    //Crea un doctor en base de datos
    public async createDoctor(doctor:DoctorReq): Promise<Doctor>{
        try{
            //Retorna una variable de tipo any
            const [createdDoctor] = await db('doctores').insert(doctor).returning('*');
            return createdDoctor;
        }catch(error){
            throw new CreateError(this.type);
        }
    }

    //Actualiza un doctor en base de datos, se pasa la información parcial del doctor
    public async updateDoctorById(id:number, updates:Partial<DoctorReq>): Promise<void>{
        try{
            //Búsqueda del doctor por id, es manejado como objeto
            await db('doctores').where({doct_id: id}).update(updates);
        }catch(error){
            throw new UpdateError(this.type);
        }
    } 
    
    //Borra el registro en base de datos dado el id
    public async deleteDoctorById(id:number): Promise<void>{
        try{
            //Búsqueda del doctor por id, es manejado como objeto
            await db('doctores').where({doct_id: id}).del();
        }catch(error){
            throw new DeleteError(this.type);
        }
    } 
}