//Interfaz con el modelo que se trae desde bd
export interface Doctor{
    doct_id: number,
    doct_nombre: string,
    doct_apellido: string,
    doct_especialidad: string,
    doct_consultorio: string,
    doct_correo: string
};