import { DoctorRepository } from './../doctores/repository';
import { AppointmentRepository } from './repository';
import { Router } from 'express';
import { AppointmentController, AppointmentControllerImpl } from './controller';
import { AppointmentServiceImpl } from './service';

const router = Router();
const appointmentRepository = new AppointmentRepository();
const doctorRepository = new DoctorRepository();
const appointmentService = new AppointmentServiceImpl(appointmentRepository, doctorRepository );
const appoController:AppointmentController = new AppointmentControllerImpl(appointmentService);

//Definición del método get, la ruta está en el raíz routes
router.get('/list_all', appoController.getAllAppointments.bind(appoController));
router.post('/create',  appoController.createAppointment.bind(appoController));
router.get('/:id',  appoController.getAppointmentById.bind(appoController));
router.put('/actualizar/:id',  appoController.updateAppointmentById.bind(appoController));
router.delete('/eliminar/:id',  appoController.deleteAppointmentById.bind(appoController));

//Exportación de la variable
export default router;