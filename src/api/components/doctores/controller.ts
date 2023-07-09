import { Request, Response } from 'express';
import logger from '../../../utils/logger';
import { DoctorService } from './service';

export interface DoctorController{
    getAllDoctors(req:Request, res:Response): void;
    createDoctor(req:Request, res:Response): void;
};

export class DoctorControllerImpl implements DoctorController{

    //Instanciación del servicio en variable privada
    private doctorService:DoctorService;

    //Constructor
    constructor(doctorService:DoctorService){
        this.doctorService = doctorService;
    }

    //Lógica del endpoint que es traída desde el servicio
    public async getAllDoctors(req: Request, res: Response): Promise<void>{

        try{
            const doctorslist = await this.doctorService.getAllDoctors();                
            res.status(200).json(doctorslist);
            
        }catch(error){
            logger.error(error);
            res.status(400).json({message:'Error trayendo doctores'});
        }
    }

    public createDoctor(req: Request, res: Response): void {

        //Se guarda el body de la petición recibida
        const doctorReq = req.body;

        this.doctorService.createDoctor(doctorReq)
        .then(
            (doctor) => {
                res.status(201).json(doctor);
            },
            (error) => {
                logger.error(error);
                res.status(400).json({message: error.message});
            }
        );
    }
};