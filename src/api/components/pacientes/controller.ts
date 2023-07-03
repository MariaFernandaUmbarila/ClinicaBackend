import {Patient} from './model';
import {Request, Response} from 'express';
import { PatientService } from './service';

export interface PatientController{
    getAllPatients(req:Request, res:Response): void;
};

export class PatientControllerImpl implements PatientController{

    //Instanciación del servicio en variable privada
    private patientService:PatientService;

    //Constructor
    constructor(patientService:PatientService){
        this.patientService = patientService;
    }

    //Lógica del endpoint
    public getAllPatients(req: Request, res: Response): void {

        //Definición de la constante para recibir respuesta del servicio
        //Debe coincidir con lo establecido en el servicio
        const patients:Patient[] = this.patientService.getAllPatients();
        res.json(patients);
    }
};