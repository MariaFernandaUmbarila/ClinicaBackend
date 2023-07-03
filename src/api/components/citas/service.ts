import {Appointment} from './model';

//Interfaz para obtener todos las citas
export interface AppointmentService{
    getAllAppointments(): Appointment[];
};


export class AppointmentServiceImpl implements AppointmentService{

    public getAllAppointments(): Appointment[] {
        return [];
    }

};