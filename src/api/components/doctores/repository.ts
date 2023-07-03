import { Doctor, DoctorReq } from './model';
import { db } from '../../../config/database';

export class DoctorRepository{

    //Retorna una promesa por lo que es una función async
    public async createDoctor(doctor:DoctorReq): Promise<Doctor>{
        try{
            //Retorna una variable de tipo any
            const [createdDoctor] = await db('doctores').insert(doctor).returning('*');
            return createdDoctor;
        }catch(error){
            throw new Error(`Error creando al doctor: ${error}`);
        }
    }
}