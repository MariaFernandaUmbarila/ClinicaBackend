//Interfaz con el modelo que se trae desde bd
export interface Appointment {
    identificacion_paciente: string
    especialidad: string
    doctor: string
    consultorio: number
    horario: string
}