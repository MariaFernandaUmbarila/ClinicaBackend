import express, {Request, Response} from 'express';
import logger from './utils/logger'; 
import routes from './api/routes';

const app = express();
const port = 3030;

//Convierte todos los bodies de los request en JSON
app.use(express.json());

//Rutas a usar
app.use('/api/v1', routes);

//Abre la escucha en el puerto escogido
app.listen(port, 'localhost', () => {
    logger.info(`Server is listening on port ${port}`)
});

