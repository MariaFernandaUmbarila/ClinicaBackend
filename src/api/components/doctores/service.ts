import { DoctorCreateError } from '../../../config/custErrors';
import { Doctor, DoctorReq } from './model';
import { DoctorRepository } from './repository';

//Interfaz para obtener todos los doctores
export interface DoctorService{
    getAllDoctors(): Promise<Doctor[]>;
    createDoctor(doctorReq:DoctorReq): Promise<Doctor>;
};


export class DoctorServiceImpl implements DoctorService{

    private doctorRepository:DoctorRepository;

    constructor(doctorRepository:DoctorRepository){
        this.doctorRepository = doctorRepository;
    }

    public getAllDoctors(): Promise<Doctor[]> {
        const doctors:Promise<Doctor[]> = this.doctorRepository.getAllDoctors();
        return doctors;
    }

    public createDoctor(doctorReq:DoctorReq): Promise<Doctor> {
        try{
            return this.doctorRepository.createDoctor(doctorReq);
        } catch (error){
            throw new DoctorCreateError();
        }
        
    }

};