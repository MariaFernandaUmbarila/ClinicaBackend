import {Doctor} from './model';
import {Request, Response} from 'express';
import { DoctorService } from './service';

export interface DoctorController{
    getAllDoctors(req:Request, res:Response): void;
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
};