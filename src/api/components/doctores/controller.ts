import { Request, Response } from 'express';
import logger from '../../../utils/logger';
import { DoctorService } from './service';
import { DeleteError, UpdateError, CreateError, GetByIdError } from '../../../utils/customerrors';
import { createDoctorSchema } from './validations/doctor.validations';

export interface DoctorController{
    getAllDoctors(req:Request, res:Response): void;
    createDoctor(req:Request, res:Response): void;
    getDoctorById(req:Request, res:Response): void;
    updateDoctorById(req:Request, res:Response): void;
    deleteDoctorById(req:Request, res:Response): void;
};

//Implementación de los métodos exportados arriba
export class DoctorControllerImpl implements DoctorController{

    //Instanciación del servicio en variable privada
    private doctorService:DoctorService;
    //Tipo para los errores customizables
    private type = "Doctor";

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

    //En este endpoint se reciben path variables
    public async getDoctorById(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id);
            const doctor = await this.doctorService.getDoctorById(id);
            if (doctor){
                res.status(200).json(doctor);
            }else{
                throw new GetByIdError(this.type);
            }
        }catch (error){
            if(error instanceof GetByIdError){
                res.status(400).json({error: error.message});
            }else{
                res.status(400).json({error: "Error trayendo doctor por id"});
            }
        }
    }

    public createDoctor(req: Request, res: Response): void {

        //Se guarda el body de la petición recibida
        const doctorReq = req.body;

        //Se hace validación de los campos con Joi
        const {error, value} = createDoctorSchema.validate(doctorReq);

        //Si la validación dio error se muestra
        if(error){
            res.status(400).json({message: error.details[0].message});
        }else{

            //Si no hay error se envía lo guardado en value
            this.doctorService.createDoctor(value)
            .then(
                (doctor) => {
                    res.status(201).json(doctor);
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
        
    }

    public async updateDoctorById(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id);
            //Se guarda el body de la petición recibida
            const doctorReq = req.body;

            const doctor = await this.doctorService.updateDoctorById(id, doctorReq);
            if (doctor){
                res.status(200).json(doctor);
            }else{
                throw new UpdateError(this.type);
            }
        }catch (error){
            if(error instanceof GetByIdError){
                res.status(400).json({error: error.message});
            }else if(error instanceof UpdateError){
                res.status(400).json({error: error.message});
            }else{
                res.status(400).json({error: "Error actualizando al doctor"});
            }
        }
    }

    public async deleteDoctorById(req: Request, res: Response): Promise<void>{
        try{
            const id = parseInt(req.params.id);
            await this.doctorService.deleteDoctorById(id);
            res.status(200).json({message: 'Doctor eliminado con exito'})
        }catch (error){
            if(error instanceof DeleteError){
                res.status(400).json({error: error.message});
            }else{
                res.status(400).json({error: "Error eliminando doctor por id"});
            }
        }
    }
};