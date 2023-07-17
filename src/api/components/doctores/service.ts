import { DoctorCreateError, DoctorDeleteError, DoctorGetByIdError, DoctorUpdateError } from '../../../utils/customerrors';
import { Doctor, DoctorReq } from './model';
import { DoctorRepository } from './repository';

//Interfaz para obtener todos los doctores
export interface DoctorService{
    getAllDoctors(): Promise<Doctor[]>;
    getDoctorById(id:number): Promise<Doctor>;
    createDoctor(doctorReq:DoctorReq): Promise<Doctor>;
    updateDoctorById(id:number, updates:Partial<DoctorReq>): Promise<Doctor>;
    deleteDoctorById(id:number): Promise<void>;
};

//Implementación de las clases exportadas arriba
export class DoctorServiceImpl implements DoctorService{

    private doctorRepository:DoctorRepository;

    constructor(doctorRepository:DoctorRepository){
        this.doctorRepository = doctorRepository;
    }

    public getAllDoctors(): Promise<Doctor[]> {
        const doctors:Promise<Doctor[]> = this.doctorRepository.getAllDoctors();
        return doctors;
    }

    public getDoctorById(id:number): Promise<Doctor>{
        try{
            return this.doctorRepository.getDoctorById(id);
        }catch (error){
            throw new DoctorGetByIdError();
        }
    }

    public createDoctor(doctorReq:DoctorReq): Promise<Doctor> {
        try{
            return this.doctorRepository.createDoctor(doctorReq);
        } catch (error){
            throw new DoctorCreateError();
        }        
    }

    public async updateDoctorById(id:number, updates:Partial<DoctorReq>): Promise<Doctor>{
        try{
            //Primero se verifica que el doctor existe
            const existeDoctor = this.doctorRepository.getDoctorById(id);
            if(!existeDoctor){
                throw new DoctorGetByIdError();
            }
            //Combina la información venida de ambos objetos
            const updateDoctor = {...existeDoctor, ...updates};

            //Hace la actualización desde el repositorio
            this.doctorRepository.updateDoctorById(id, updates);
            return updateDoctor;

        } catch (error){
            throw new DoctorUpdateError();
        }
    }

    public async deleteDoctorById(id:number): Promise<void>{
        try{

            const existeDoctor = await this.doctorRepository.getDoctorById(id);
            if(!existeDoctor){
                throw new DoctorGetByIdError();
            }
            await this.doctorRepository.deleteDoctorById(id);
            
        }catch (error){
            throw new DoctorDeleteError();
        }
    }

};