import {Router} from 'express';
import doctorRoutes from './components/doctores/doctorRoutes';

const router = Router();

//Se definen las rutas para cada componente
router.use('/doctores', doctorRoutes);

//Exportación de la variable
export default router;