//Interfaz con el modelo que se trae desde bd
export interface Appointment {
    cita_especialidad: string
    cita_paci_identif: string
    cita_doctor: string
    cita_consultorio: string
    cita_horario: string
}

//Modelo para las peticiones que se reciben
export interface AppointmentReq {
    cita_paci_identif: string
    cita_especialidad: string
    cita_doct_id: number
    cita_horario: string
}

export interface AppointmentResDB {
    cita_id: number
    cita_horario: string
    cita_especialidad: string
    cita_doct_id: number
    cita_paci_identif: string
    cita_consultorio: string
    cita_created_at: string
    cita_updated_at: string
}