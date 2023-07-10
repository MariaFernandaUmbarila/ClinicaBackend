//Permite definir errores que pasan comunmente

class DoctorGetAllError extends Error{
    constructor(){
        super("Fallo al obtener la lista de doctores");
        this.name = 'DoctorGetAllError';
    }
}

class DoctorGetByIdError extends Error{
    constructor(){
        super("Fallo al obtener el doctor dado el id");
        this.name = 'DoctorGetByIdError';
    }
}

class DoctorCreateError extends Error{
    constructor(){
        super("Fallo al obtener la lista de cotores");
        this.name = 'DoctorCreateError';
    }
}

export {DoctorCreateError, DoctorGetAllError, DoctorGetByIdError};