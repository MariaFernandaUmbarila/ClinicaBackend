//Interfaz con el modelo que se trae desde bd
export interface Patient {
    paci_id: number
    paci_nombre: string
    paci_apellido: string
    paci_identifi: string
    paci_telefono: number
    paci_createdAt: Date
    paci_updatedAt: Date
}