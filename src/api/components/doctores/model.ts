//Interfaz con el modelo que se trae desde bd
export interface Doctor{
    doct_id: number,
    doct_nombre: string,
    doct_apellido: string,
    doct_especialidad: string,
    doct_consultorio: string,
    doct_correo?: string,
    doct_createdAt?: Date
    doct_updatedAt?: Date
};

//Modelo para las peticiones que se reciben
export interface DoctorReq{
    doct_nombre: string,
    doct_apellido: string,
    doct_especialidad: string,
    doct_consultorio: number,
    doct_correo: string,
};