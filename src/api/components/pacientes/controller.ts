import { Request, Response } from 'express';
import logger from '../../../utils/logger';
import { PatientService } from './service';
import { GetByIdError, UpdateError, DeleteError } from '../../../utils/customerrors';

export interface PatientController{
    getAllPatients(req:Request, res:Response): void;
    createPatient(req:Request, res:Response): void;
    getPatientById(req:Request, res:Response): void;
    updatePatientById(req:Request, res:Response): void;
    deletePatientById(req:Request, res:Response): void;
};

//Implementación de los métodos exportados arriba
export class PatientControllerImpl implements PatientController{

    //Tipo para los errores customizables
    private type = "Patient";

    //Instanciación del servicio en variable privada
    private patientService:PatientService;

    //Constructor
    constructor(patientService:PatientService){
        this.patientService = patientService;
    }

    //Lógica del endpoint que es traída desde el servicio
    public async getAllPatients(req: Request, res: Response): Promise<void>{

        try{
            const patientslist = await this.patientService.getAllPatients();                
            res.status(200).json(patientslist);
            
        }catch(error){
            logger.error(error);
            res.status(400).json({message:'Error trayendo pacientes'});
        }
    }

    //En este endpoint se reciben path variables
    public async getPatientById(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id);
            const patient = await this.patientService.getPatientById(id);
            if (patient){
                res.status(200).json(patient);
            }else{
                throw new GetByIdError(this.type);
            }
        }catch (error){
            if(error instanceof GetByIdError){
                res.status(400).json({error: error.message});
            }else{
                res.status(400).json({error: "Error trayendo paciente por id"});
            }
        }
    }

    public createPatient(req: Request, res: Response): void {

        //Se guarda el body de la petición recibida
        const patientReq = req.body;

        this.patientService.createPatient(patientReq)
        .then(
            (patient) => {
                res.status(201).json(patient);
            },
            (error) => {
                logger.error(error);
                res.status(400).json({message: error.message});
            }
        );
    }

    public async updatePatientById(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id);
            //Se guarda el body de la petición recibida
            const patientReq = req.body;

            const patient = await this.patientService.updatePatientById(id, patientReq);
            if (patient){
                res.status(200).json(patient);
            }else{
                throw new UpdateError(this.type);
            }
        }catch (error){
            if(error instanceof GetByIdError){
                res.status(400).json({error: error.message});
            }else if(error instanceof UpdateError){
                res.status(400).json({error: error.message});
            }else{
                res.status(400).json({error: "Error actualizando al paciente"});
            }
        }
    }

    public async deletePatientById(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id);
            await this.patientService.deletePatientById(id);
            res.status(200).json({message: 'Paciente eliminado con exito'})
        }catch (error){
            if(error instanceof DeleteError){
                res.status(400).json({error: error.message});
            }else{
                res.status(400).json({error: "Error eliminando paciente por id"});
            }
        }
    }
};