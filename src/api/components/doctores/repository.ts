import { Doctor, DoctorReq } from './model';
import { db } from '../../../config/database';
import { DoctorCreateError, DoctorGetAllError } from '../../../config/custErrors';

export class DoctorRepository{

    public async getAllDoctors(): Promise<Doctor[]>{
        try{
            //Retorna una variable de tipo any
            return db.select('*').from('doctores');
        }catch(error){
            throw new DoctorGetAllError();
        }
    }

    //Retorna una promesa por lo que es una función async
    public async createDoctor(doctor:DoctorReq): Promise<Doctor>{
        try{
            //Retorna una variable de tipo any
            const [createdDoctor] = await db('doctores').insert(doctor).returning('*');
            return createdDoctor;
        }catch(error){
            throw new DoctorCreateError();
        }
    }
}