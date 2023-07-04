import { AppointmentService } from './service';
import { Request, Response } from 'express';
import logger from '../../../utils/logger';

export interface AppointmentController{
    getAllAppointments(req:Request, res:Response): void;
    createAppointment(req:Request, res:Response): void;
};

export class AppointmentControllerImpl implements AppointmentController{

    //Instanciación del servicio en variable privada
    private appointmentService:AppointmentService;

    //Constructor
    constructor(appointmentService:AppointmentService){
        this.appointmentService = appointmentService;
    }

    //Lógica del endpoint
    public async getAllAppointments(req: Request, res: Response): Promise<void>{

        try{
            const appointmentslist = await this.appointmentService.getAllAppointments();                
            res.status(201).json(appointmentslist);
            
        }catch(error){
            logger.error(error);
            res.status(400).json({message:error});
        }
    }

    public createAppointment(req: Request, res: Response): void {

        //Se guarda el body de la petición recibida
        const appointmentReq = req.body;

        try{
            this.appointmentService.createAppointment(appointmentReq).then((appointment) => {
                res.status(201).json(appointment);
            });
        }catch(error){
            logger.error(error);
            res.status(400).json({message:error});
        }
    }
};