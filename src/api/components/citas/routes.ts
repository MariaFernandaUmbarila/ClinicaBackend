import {Router, Request, Response} from 'express';
import logger from '../../../utils/logger';
import { AppointmentController, AppointmentControllerImpl } from './controller';
import { AppointmentServiceImpl } from './service';

const router = Router();
const appointmentService = new AppointmentServiceImpl();
const appoController:AppointmentController = new AppointmentControllerImpl(appointmentService );

//Definición del método get, la ruta está en el raíz routes
router.get('', appoController.getAllAppointments.bind(appoController));

//Exportación de la variable
export default router;