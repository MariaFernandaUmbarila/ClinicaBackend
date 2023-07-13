import { GetByIdError, CreateError, UpdateError, DeleteError } from '../../../config/customerrors';
import { Patient, PatientReq } from './model';
import { PatientRepository } from './repository';

//Interfaz para obtener todos los pacientes
export interface PatientService{
    getAllPatients(): Promise<Patient[]>;
    getPatientById(id:number): Promise<Patient>;
    createPatient(patientReq:PatientReq): Promise<Patient>;
    updatePatientById(id:number, updates:Partial<PatientReq>): Promise<Patient>;
    deletePatientById(id:number): Promise<void>;
};

//Implementación de las clases exportadas arriba
export class PatientServiceImpl implements PatientService{

    private patientRepository:PatientRepository;

    constructor(patientRepository:PatientRepository){
        this.patientRepository = patientRepository;
    }

    public getAllPatients(): Promise<Patient[]> {
        const patients:Promise<Patient[]> = this.patientRepository.getAllPatients();
        return patients;
    }

    public getPatientById(id:number): Promise<Patient>{
        try{
            return this.patientRepository.getPatientById(id);
        }catch (error){
            throw new GetByIdError("Patient");
        }
    }

    public createPatient(patientReq:PatientReq): Promise<Patient> {
        try{
            return this.patientRepository.createPatient(patientReq);
        } catch (error){
            throw new CreateError("Patient");
        }        
    }

    public async updatePatientById(id:number, updates:Partial<PatientReq>): Promise<Patient>{
        try{
            //Primero se verifica que el paciente existe
            const existePaciente = this.patientRepository.getPatientById(id);
            if(!existePaciente){
                throw new GetByIdError("Patient");
            }
            //Combina la información venida de ambos objetos
            const updatePatient = {...existePaciente, ...updates};

            //Hace la actualización desde el repositorio
            this.patientRepository.updatePatientById(id, updates);
            return updatePatient;

        } catch (error){
            throw new UpdateError("Patient");
        }
    }

    public async deletePatientById(id:number): Promise<void>{
        try{

            const existePaciente = await this.patientRepository.getPatientById(id);
            if(!existePaciente){
                throw new GetByIdError("Patient");
            }
            await this.patientRepository.deletePatientById(id);
            
        }catch (error){
            throw new DeleteError("Patient");
        }
    }

};