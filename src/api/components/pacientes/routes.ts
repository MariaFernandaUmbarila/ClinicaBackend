import {Router, Request, Response} from 'express';
import logger from '../../../utils/logger';
import { PatientController, PatientControllerImpl } from './controller';
import { PatientServiceImpl } from './service';

const router = Router();
const patientService = new PatientServiceImpl();
const patiController:PatientController = new PatientControllerImpl(patientService );

//Definición del método get, la ruta está en el raíz routes
router.get('', patiController.getAllPatients.bind(patiController));

//Exportación de la variable
export default router;