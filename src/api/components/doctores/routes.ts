import {Router, Request, Response} from 'express';
import logger from '../../../utils/logger';
import { DoctorController, DoctorControllerImpl } from './controller';
import { DoctorServiceImpl } from './service';

const router = Router();
const doctorService = new DoctorServiceImpl();
const doctController:DoctorController = new DoctorControllerImpl(doctorService );

//Definición del método get, la ruta está en el raíz routes
router.get('', doctController.getAllDoctors.bind(doctController));

//Exportación de la variable
export default router;