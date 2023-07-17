import Joi = require('joi');
import { Especialidad } from '../../../../utils/model';

const createDoctorSchema = Joi.object({
    doct_nombre: Joi.string().required(),
    doct_apellido: Joi.string().required(),
    //Valida la especialidad, que corresponda con el enum
    doct_especialidad: Joi.string().valid(...Object.values(Especialidad)).required(),
    doct_consultorio: Joi.number().min(100).max(999).required(),
    doct_correo: Joi.string().required(),
});

export { createDoctorSchema };