import { Appointment, AppointmentReq } from './model';
import { AppointmentRepository } from './repository';

//Interfaz para obtener todos las citas
export interface AppointmentService{
    getAllAppointments(): Promise<Appointment[]>;
    createAppointment(appointmentReq:AppointmentReq): Promise<Appointment>;
};


export class AppointmentServiceImpl implements AppointmentService{

    private appointmentRepository:AppointmentRepository;

    constructor(){
        this.appointmentRepository = new AppointmentRepository();
    }

    public getAllAppointments(): Promise<Appointment[]> {
        const appointments:Promise<Appointment[]> = this.appointmentRepository.getAllAppointments();
        return appointments;
    }

    public createAppointment(appointmentReq:AppointmentReq): Promise<Appointment> {
        return this.appointmentRepository.createAppointment(appointmentReq);
    }

};