import { Router } from 'express';
import { PatientController, PatientControllerImpl } from './controller';
import { PatientServiceImpl } from './service';

const router = Router();
const patientService = new PatientServiceImpl();
const patiController:PatientController = new PatientControllerImpl(patientService );

//Definición del método get, la ruta está en el raíz routes
router.get('/list_all', patiController.getAllPatients.bind(patiController));
router.post('/create', patiController.createPatient.bind(patiController));

//Exportación de la variable
export default router;