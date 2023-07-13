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
        super("Fallo al obtener la lista de doctores");
        this.name = 'DoctorCreateError';
    }
}

class DoctorUpdateError extends Error{
    constructor(){
        super("Fallo al actualizar la informacion del doctor");
        this.name = 'DoctorUpdateError';
    }
}

class DoctorDeleteError extends Error{
    constructor(){
        super("Fallo al borrar la informacion del doctor");
        this.name = 'DoctorUpdateError';
    }
}

export {
    DoctorCreateError, 
    DoctorGetAllError, 
    DoctorGetByIdError,
    DoctorUpdateError,
    DoctorDeleteError
};