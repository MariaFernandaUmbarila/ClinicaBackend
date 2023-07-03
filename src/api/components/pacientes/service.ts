import {Patient} from './model';

//Interfaz para obtener todos los pacientes
export interface PatientService{
    getAllPatients(): Patient[];
};


export class PatientServiceImpl implements PatientService{

    public getAllPatients(): Patient[] {
        return [];
    }

};