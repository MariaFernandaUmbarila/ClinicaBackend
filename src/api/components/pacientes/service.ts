import { Patient, PatientReq } from './model';
import { PatientRepository } from './repository';

//Interfaz para obtener todos los pacientes
export interface PatientService{
    getAllPatients(): Promise<Patient[]>;
    createPatient(patientReq:PatientReq): Promise<Patient>;
};


export class PatientServiceImpl implements PatientService{

    private patientRepository:PatientRepository;

    constructor(){
        this.patientRepository = new PatientRepository();
    }

    public getAllPatients(): Promise<Patient[]> {
        const patients:Promise<Patient[]> = this.patientRepository.getAllPatients();
        return patients;
    }

    public createPatient(patientReq:PatientReq): Promise<Patient> {
        return this.patientRepository.createPatient(patientReq);
    }

};