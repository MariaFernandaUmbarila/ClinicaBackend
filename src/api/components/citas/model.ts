//Interfaz con el modelo que se trae desde bd
export interface Appointment {
    cita_id: string
    cita_especialidad: string
    cita_doct_id: string
    cita_consultorio: number
    cita_horario: string
}

//Modelo para las peticiones que se reciben
export interface AppointmentReq {
    identificacion_paciente: string
    especialidad: string
    id_doctor: number
    horario: string
}