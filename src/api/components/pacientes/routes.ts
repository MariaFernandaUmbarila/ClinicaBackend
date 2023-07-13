import { PatientRepository } from './repository';
import { Router } from 'express';
import { PatientController, PatientControllerImpl } from './controller';
import { PatientServiceImpl } from './service';

const router = Router();
const patientRepository = new PatientRepository();
const patientService = new PatientServiceImpl(patientRepository);
const patiController:PatientController = new PatientControllerImpl(patientService);

//Definición del método get, la ruta está en el raíz routes
router.get('/list_all', patiController.getAllPatients.bind(patiController));
router.post('/create',  patiController.createPatient.bind(patiController));
router.get('/:id',  patiController.getPatientById.bind(patiController));
router.put('/actualizar/:id',  patiController.updatePatientById.bind(patiController));
router.delete('/eliminar/:id',  patiController.deletePatientById.bind(patiController));

//Exportación de la variable
export default router;