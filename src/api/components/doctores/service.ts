import { CreateError, DeleteError, GetByIdError, UpdateError } from '../../../utils/customerrors';
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
    //Tipo para los errores customizables
    public type:string = "Doctor";

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
            throw new GetByIdError(this.type);
        }
    }

    public createDoctor(doctorReq:DoctorReq): Promise<Doctor> {
        try{
            return this.doctorRepository.createDoctor(doctorReq);
        } catch (error){
            throw new CreateError(this.type);
        }        
    }

    public async updateDoctorById(id:number, updates:Partial<DoctorReq>): Promise<Doctor>{
        try{
            //Primero se verifica que el doctor existe
            const existeDoctor = this.doctorRepository.getDoctorById(id);
            if(!existeDoctor){
                throw new GetByIdError(this.type);
            }
            //Combina la información venida de ambos objetos
            const updateDoctor = {...existeDoctor, ...updates};

            //Hace la actualización desde el repositorio
            this.doctorRepository.updateDoctorById(id, updates);
            return updateDoctor;

        } catch (error){
            throw new UpdateError(this.type);
        }
    }

    public async deleteDoctorById(id:number): Promise<void>{
        try{

            const existeDoctor = await this.doctorRepository.getDoctorById(id);
            if(!existeDoctor){
                throw new GetByIdError(this.type);
            }
            await this.doctorRepository.deleteDoctorById(id);
            
        }catch (error){
            throw new DeleteError(this.type);
        }
    }

};