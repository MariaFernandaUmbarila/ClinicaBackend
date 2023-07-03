import {Doctor} from './model';

//Interfaz para obtener todos los doctores
export interface DoctorService{
    getAllDoctors(): Doctor[];
};


export class DoctorServiceImpl implements DoctorService{

    public getAllDoctors(): Doctor[] {
        return [];
    }

};