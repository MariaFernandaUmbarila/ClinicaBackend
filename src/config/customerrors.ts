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
        super("Fallo al crear el doctor");
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
        this.name = 'DoctorDeleteError';
    }
}

class GetAllError extends Error{

    constructor(type:string){
        switch(type) { 
            case "Doctor":{ 
                super("Fallo al obtener la lista de doctores");
                this.name = 'DoctorGetAllError';
                break; 
            } 
            case "Patient":{ 
                super("Fallo al obtener la lista de pacientes");
                this.name = 'PatientGetAllError';
                break; 
            } 
            default: { 
                super("Fallo no identificado en obtener todos");
                this.name = 'ErrorNotIdentifiedGetAll';
                break; 
            } 
        }         
    }
}

class GetByIdError extends Error{

    constructor(type:string){
        switch(type) { 
            case "Doctor":{ 
                super("Fallo al obtener el doctor dado el id");
                this.name = 'DoctorGetByIdError';
                break; 
            } 
            case "Patient":{ 
                super("Fallo al obtener el paciente dado el id");
                this.name = 'PatientGetByIdError';
                break; 
            } 
            default: { 
                super("Fallo no identificado en obtener por id");
                this.name = 'ErrorNotIdentifiedGetById';
                break; 
            } 
        }         
    }
}

class CreateError extends Error{

    constructor(type:string){
        switch(type) { 
            case "Doctor":{ 
                super("Fallo al crear el doctor");
                this.name = 'DoctorCreateError';
                break; 
            } 
            case "Patient":{ 
                super("Fallo al crear al paciente");
                this.name = 'PatientCreateError';
                break; 
            } 
            default: { 
                super("Fallo no identificado en crear");
                this.name = 'ErrorNotIdentifiedCreate';
                break; 
            } 
        }         
    }
}

class UpdateError extends Error{

    constructor(type:string){
        switch(type) { 
            case "Doctor":{ 
                super("Fallo al actualizar la informacion del doctor");
                this.name = 'DoctorUpdateError';
                break; 
            } 
            case "Patient":{ 
                super("Fallo al actualizar al paciente");
                this.name = 'PatientUpdateError';
                break; 
            } 
            default: { 
                super("Fallo no identificado en obtener actualizar");
                this.name = 'ErrorNotIdentifiedUpdate';
                break; 
            } 
        }         
    }
}

class DeleteError extends Error{

    constructor(type:string){
        switch(type) { 
            case "Doctor":{ 
                super("Fallo al borrar la informacion del doctor");
                this.name = 'DoctorDeleteError';
                break; 
            } 
            case "Patient":{ 
                super("Fallo al borrar al paciente");
                this.name = 'PatientDeleteError';
                break; 
            } 
            default: { 
                super("Fallo no identificado en obtener borrar");
                this.name = 'ErrorNotIdentifiedDelete';
                break; 
            } 
        }         
    }
}

export {
    DoctorCreateError, 
    DoctorGetAllError, 
    DoctorGetByIdError,
    DoctorUpdateError,
    DoctorDeleteError,
    GetAllError,
    GetByIdError,
    CreateError,
    UpdateError,
    DeleteError
};