import { GetByIdError, DeleteError, CreateError, UpdateError } from '../../../config/customerrors';
import { Doctor } from '../doctores/model';
import { DoctorRepository } from '../doctores/repository';
import { Appointment, AppointmentReq, AppointmentResDB } from './model';
import { AppointmentRepository } from './repository';

//Interfaz para obtener todos las citas
export interface AppointmentService{
    getAllAppointments(): Promise<Appointment[]>;
    getAppointmentById(id:number): Promise<Appointment>;
    createAppointment(appointmentReq:AppointmentReq): Promise<Appointment>;
    //updateAppointmentById(id:number, updates:Partial<AppointmentReq>): Promise<Appointment>;
    deleteAppointmentById(id:number): Promise<void>;
};

//Implementación de las clases exportadas arriba
export class AppointmentServiceImpl implements AppointmentService{

    private appointmentRepository:AppointmentRepository;
    private doctorRepository:DoctorRepository;

    constructor(appointmentRepository:AppointmentRepository, doctorRepository:DoctorRepository){
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
    }

    public getAllAppointments(): Promise<Appointment[]> {
        const appointments:Promise<Appointment[]> = this.appointmentRepository.getAllAppointments();
        return appointments;
    }

    public async getAppointmentById(id:number): Promise<Appointment>{

        //Se usan los datos traídos desde base de datos tanto de la cita...
        const appointmentDb = await this.appointmentRepository.getAppointmentById(id);
        const doctor = await this.doctorRepository.getDoctorById(appointmentDb.cita_doct_id);

        const appointmentData:Appointment = mapAppointment(appointmentDb, doctor);    
        return appointmentData;
    }

    public async createAppointment(appoReq:AppointmentReq): Promise<Appointment> {
        try{
    
            //Se usan los datos traídos desde base de datos tanto de la cita...
            const appointmentDb = await this.appointmentRepository.createAppointment(appoReq);
            const doctor = await this.doctorRepository.getDoctorById(appointmentDb.cita_doct_id);
    
            const appointmentData:Appointment = mapAppointment(appointmentDb, doctor);    
            return appointmentData;
    
        } catch (error){
            throw new CreateError("Appointment");
        }        
    }

    /* public async updateAppointmentById(id:number, updates:Partial<AppointmentReq>): Promise<Appointment>{
        try{
            //Primero se verifica que la cita existe
            const existeCita = this.appointmentRepository.getAppointmentById(id);
            if(!existeCita){
                throw new GetByIdError("Appointment");
            }
            //Combina la información venida de ambos objetos
            const updateAppointment = {...existeCita, ...updates};

            //Hace la actualización desde el repositorio
            this.appointmentRepository.updateAppointmentById(id, updates);
            return updateAppointment;

        } catch (error){
            throw new UpdateError("Appointment");
        }
    } */

    public async deleteAppointmentById(id:number): Promise<void>{
        try{

            const existeCita = await this.appointmentRepository.getAppointmentById(id);
            if(!existeCita){
                throw new GetByIdError("Appointment");
            }
            await this.appointmentRepository.deleteAppointmentById(id);
            
        }catch (error){
            throw new DeleteError("Appointment");
        }
    }

};

//Función para hacer el mapeo entre cita y doctor
function mapAppointment(appointmentDb:AppointmentResDB, doctor:Doctor):Appointment{
    
    const appointmentData:Appointment = {
        cita_paci_identif: appointmentDb.cita_paci_identif,
        cita_especialidad: appointmentDb.cita_especialidad,
        cita_doctor: `${doctor.doct_nombre} ${doctor.doct_apellido}`,
        cita_consultorio: doctor.doct_consultorio,
        cita_horario: appointmentDb.cita_horario
    };
    return appointmentData;
}