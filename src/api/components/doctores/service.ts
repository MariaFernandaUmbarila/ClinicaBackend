import {Doctor, DoctorReq} from './model';
import { DoctorRepository } from './repository';

//Interfaz para obtener todos los doctores
export interface DoctorService{
    getAllDoctors(): Doctor[];
    createDoctor(doctorReq:DoctorReq): Promise<Doctor>;
};


export class DoctorServiceImpl implements DoctorService{

    private doctorRepository:DoctorRepository;

    constructor(){
        this.doctorRepository = new DoctorRepository();
    }

    public getAllDoctors(): Doctor[] {
        return [];
    }

    public createDoctor(doctorReq:DoctorReq): Promise<Doctor> {
        const createdDoctor:Promise<Doctor> = this.doctorRepository.createDoctor(doctorReq).then();
        return createdDoctor;
    }

};