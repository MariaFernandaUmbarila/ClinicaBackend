import { Router }  from 'express';
import { AppointmentController, AppointmentControllerImpl } from './controller';
import { AppointmentServiceImpl } from './service';

const router = Router();
const appointmentService = new AppointmentServiceImpl();
const appoController:AppointmentController = new AppointmentControllerImpl(appointmentService );

//Definición del método get, la ruta está en el raíz routes
router.get('/list_all', appoController.getAllAppointments.bind(appoController));
router.post('/create',  appoController.createAppointment.bind(appoController));

//Exportación de la variable
export default router;