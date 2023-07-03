import {Router} from 'express';
import doctorRoutes from './components/doctores/routes';
import patientRoutes from './components/pacientes/routes';
import appointmentRoutes from './components/citas/routes';

const router = Router();

//Se definen las rutas para cada componente
router.use('/doctores', doctorRoutes);
router.use('/pacientes', patientRoutes);
router.use('/citas',  appointmentRoutes);

//Exportación de la variable
export default router;