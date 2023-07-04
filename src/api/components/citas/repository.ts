import { Appointment, AppointmentReq } from './model';
import { db } from '../../../config/database';

export class AppointmentRepository{

    public async getAllAppointments(): Promise<Appointment[]>{
        try{
            //Retorna una variable de tipo any
            return db.select('*').from('citas');
        }catch(error){
            throw new Error(`Error consultando citas: ${error}`);
        }
    }

    //Retorna una promesa por lo que es una función async
    public async createAppointment(cita:AppointmentReq): Promise<Appointment>{
        try{
            //Retorna una variable de tipo any
            const [createdAppointment] = await db('doctores').insert(cita).returning('*');
            return createdAppointment;
        }catch(error){
            throw new Error(`Error creando la cita: ${error}`);
        }
    }
}