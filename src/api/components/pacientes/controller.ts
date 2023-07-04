import { Request, Response } from 'express';
import logger from '../../../utils/logger';
import { PatientService } from './service';

export interface PatientController{
    getAllPatients(req:Request, res:Response): void;
    createPatient(req:Request, res:Response): void;
};

export class PatientControllerImpl implements PatientController{

    //Instanciación del servicio en variable privada
    private patientService:PatientService;

    //Constructor
    constructor(patientService:PatientService){
        this.patientService = patientService;
    }

    //Lógica del endpoint
    public async getAllPatients(req: Request, res: Response): Promise<void>{

        try{
            const patientslist = await this.patientService.getAllPatients();                
            res.status(201).json(patientslist);
            
        }catch(error){
            logger.error(error);
            res.status(400).json({message:error});
        }
    }

    public createPatient(req: Request, res: Response): void {

        //Se guarda el body de la petición recibida
        const patientReq = req.body;

        try{
            this.patientService.createPatient(patientReq).then((patient) => {
                res.status(201).json(patient);
            });
        }catch(error){
            logger.error(error);
            res.status(400).json({message:error});
        }
    }
};