import { Doctor } from './model';
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

    //Lógica del endpoint
    public getAllDoctors(req: Request, res: Response): void {

        //Definición de la constante para recibir respuesta del servicio
        //Debe coincidir con lo establecido en el servicio
        const doctors:Doctor[] = this.doctorService.getAllDoctors();
        res.json(doctors);
    }

    public createDoctor(req: Request, res: Response): void {

        //Se guarda el body de la petición recibida
        const doctorReq = req.body;

        try{
            this.doctorService.createDoctor(doctorReq).then((doctor) => {
                res.json(doctor);
            });
        }catch(error){
            logger.error(error);
            res.status(400).json({message:error});
        }
    }
};