import { DoctorRepository } from './repository';
import { Router } from 'express';
import { DoctorController, DoctorControllerImpl } from './controller';
import { DoctorServiceImpl } from './service';

const router = Router();
const doctorRepository = new DoctorRepository();
const doctorService = new DoctorServiceImpl(doctorRepository);
const doctController:DoctorController = new DoctorControllerImpl(doctorService );

//Definición del método get, la ruta está en el raíz routes
router.get('/list_all', doctController.getAllDoctors.bind(doctController));
router.post('/create',  doctController.createDoctor.bind(doctController));

//Exportación de la variable
export default router;