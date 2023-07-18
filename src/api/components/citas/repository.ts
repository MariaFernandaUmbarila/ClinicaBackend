import { Appointment, AppointmentReq, AppointmentResDB } from './model';
import { db } from '../../../config/database';
import { GetAllError, GetByIdError, UpdateError, CreateError, DeleteError } from '../../../utils/customerrors';


//No implementa ninguna otra clase, es como una clase 'raiz'
export class AppointmentRepository{

    //Tipo para los errores customizables
    private type = "Appointment";

    //Lista todos los doctores
    public async getAllAppointments(): Promise<Appointment[]>{
        try{
            //Retorna una variable de tipo any
            return db.select('*').from('citas');
        }catch(error){
            throw new GetAllError(this.type);
        }
    }

    //Lista la información de un doctor dado el id
    public async getAppointmentById(id:number): Promise<AppointmentResDB>{
        try{
            //Búsqueda del doctor por id, es manejado como objeto
            const appointment = await db('citas').where({cita_id: id}).first();
            return appointment;
        }catch(error){
            throw new GetByIdError(this.type);
        }
    }

    //Crea un doctor en base de datos
    public async createAppointment(appointment:AppointmentReq): Promise<AppointmentResDB>{
        try{
            //Retorna una variable de tipo any
            const [createdAppointment] = await db('citas').insert(appointment).returning('*');
            return createdAppointment;
        }catch(error){
            throw new CreateError(this.type);
        }
    }

    //Actualiza una cita en base de datos, se pasa la información parcial de la cita
    public async updateAppointmentById(id:number, updates:Partial<AppointmentReq>): Promise<void>{
        try{
            //Búsqueda de la cita id, es manejado como objeto
            await db('citas').where({cita_id: id}).update(updates);
        }catch(error){
            throw new UpdateError(this.type);
        }
    } 
    
    //Borra el registro en base de datos dado el id
    public async deleteAppointmentById(id:number): Promise<void>{
        try{
            //Búsqueda de la cita por id, es manejado como objeto
            await db('citas').where({cita_id: id}).del();
        }catch(error){
            throw new DeleteError(this.type);
        }
    } 
}