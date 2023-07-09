import { Request, Response, NextFunction } from "express";

class CustomError extends Error{

    //Herencia de la calse Error
    constructor(public statusCode: number, public message:string){
        super(message);
        this.name = 'CustomError';
    }
}

//El error siempre caerá en alguno de estos casos, pero no matará la aplicación
const errorHandlerMdw = (err: any, req: Request, res:Response, next:NextFunction) => {

    if(err instanceof CustomError){
        res.status(err.statusCode).json({error: err.message});
    }else if(err.message.includes('Unexpected tocken')){
        //Se puede personalizar los mensajes de esta manera
        res.status(err.statusCode).json({error: 'La petición está mal estructurada'});
    }else{
        res.status(500).json({error: 'Internal Server Error'});
    }
};

export {errorHandlerMdw};