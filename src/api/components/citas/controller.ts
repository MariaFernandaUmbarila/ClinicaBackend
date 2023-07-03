import {Appointment} from './model';
import {Request, Response} from 'express';
import { AppointmentService } from './service';

export interface AppointmentController{
    getAllAppointments(req:Request, res:Response): void;
};

export class AppointmentControllerImpl implements AppointmentController{

    //Instanciación del servicio en variable privada
    private appointmentService:AppointmentService;

    //Constructor
    constructor(appointmentService:AppointmentService){
        this.appointmentService = appointmentService;
    }

    //Lógica del endpoint
    public getAllAppointments(req: Request, res: Response): void {

        //Definición de la constante para recibir respuesta del servicio
        //Debe coincidir con lo establecido en el servicio
        const appointments:Appointment[] = this.appointmentService.getAllAppointments();
        res.json(appointments);
    }
};