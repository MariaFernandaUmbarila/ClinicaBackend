import {Router, Request, Response} from 'express';
import logger from '../../../utils/logger';
import { DoctorController, DoctorControllerImpl } from './controller';

const router = Router();
const doctController:DoctorController = new DoctorControllerImpl;

//Definición del método get, la ruta está en el raíz routes
router.get('', doctController.getAllDoctors.bind(doctController));

//Exportación de la variable
export default router;