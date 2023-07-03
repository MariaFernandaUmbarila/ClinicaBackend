import {Doctor} from './model';
import {Request, Response} from 'express';
import { DoctorService } from './service';

export interface DoctorController{
    getAllDoctors(req:Request, res:Response): void;
};

export class DoctorControllerImpl implements DoctorController{
    public getAllDoctors(req: Request, res: Response): void {
        res.send("");
    }
};