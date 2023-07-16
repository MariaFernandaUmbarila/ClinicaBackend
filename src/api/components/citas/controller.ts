import { Request, Response } from 'express';
import logger from '../../../utils/logger';
import { AppointmentService } from './service';
import { GetAllError, GetByIdError, UpdateError, CreateError, DeleteError } from '../../../config/customerrors';

export interface AppointmentController{
    getAllAppointments(req:Request, res:Response): void;
    createAppointment(req:Request, res:Response): void;
    getAppointmentById(req:Request, res:Response): void;
    //updateAppointmentById(req:Request, res:Response): void;
    deleteAppointmentById(req:Request, res:Response): void;
};

//Implementación de los métodos exportados arriba
export class AppointmentControllerImpl implements AppointmentController{

    //Instanciación del servicio en variable privada
    private appointmentService:AppointmentService;

    //Constructor
    constructor(appointmentService:AppointmentService){
        this.appointmentService = appointmentService;
    }

    //Lógica del endpoint que es traída desde el servicio
    public async getAllAppointments(req: Request, res: Response): Promise<void>{

        try{
            const appointmentslist = await this.appointmentService.getAllAppointments();                
            res.status(200).json(appointmentslist);
            
        }catch(error){
            logger.error(error);
            res.status(400).json({message:'Error trayendo citas'});
        }
    }

    //En este endpoint se reciben path variables
    public async getAppointmentById(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id);
            const appointment = await this.appointmentService.getAppointmentById(id);
            if (appointment){
                res.status(200).json(appointment);
            }else{
                throw new GetByIdError("Appointment");
            }
        }catch (error){
            if(error instanceof GetByIdError){
                res.status(400).json({error: error.message});
            }else{
                res.status(400).json({error: "Error trayendo cita por id"});
            }
        }
    }

    public createAppointment(req: Request, res: Response): void {

        //Se guarda el body de la petición recibida
        const appointmentReq = req.body;

        this.appointmentService.createAppointment(appointmentReq)
        .then(
            (appointment) => {
                res.status(201).json(appointment);
            },
            (error) => {
                if (error instanceof CreateError){
                    res.status(400).json({error: error.message});
                } else {
                    res.status(400).json({error: "Internal Server Error"});                   
                }
            }
        );
    }

    /* public async updateAppointmentById(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id);
            //Se guarda el body de la petición recibida
            const appointmentReq = req.body;

            const appointment = await this.appointmentService.updateAppointmentById(id, appointmentReq);
            if (appointment){
                res.status(200).json(appointment);
            }else{
                throw new UpdateError("Appointment");
            }
        }catch (error){
            if(error instanceof GetByIdError){
                res.status(400).json({error: error.message});
            }else if(error instanceof UpdateError){
                res.status(400).json({error: error.message});
            }else{
                res.status(400).json({error: "Error actualizando la cita"});
            }
        }
    } */

    public async deleteAppointmentById(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id);
            await this.appointmentService.deleteAppointmentById(id);
            res.status(200).json({message: 'Cita eliminada con exito'})
        }catch (error){
            if(error instanceof DeleteError){
                res.status(400).json({error: error.message});
            }else{
                res.status(400).json({error: "Error eliminando cita por id"});
            }
        }
    }
};