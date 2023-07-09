//Permite definir errores que pasan comunmente

class DoctorGetAllError extends Error{
    constructor(){
        super("Fallo al obtener la lista de doctores");
        this.name = 'DoctorGetAllError';
    }
}

class DoctorCreateError extends Error{
    constructor(){
        super("Fallo al obtener la lista de cotores");
        this.name = 'DoctorCreateError';
    }
}

export {DoctorCreateError, DoctorGetAllError};