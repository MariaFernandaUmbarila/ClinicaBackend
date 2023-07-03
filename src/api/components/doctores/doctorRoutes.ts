import {Router, Request, Response} from 'express';
import logger from '../../../utils/logger';

const router = Router();

//Definición del método get, la ruta está en el raíz routes
router.get('', (req: Request, res: Response) => {
    const especialidades = [{
        "_id":1,
        "esp_nombre":"Medicina general",
        "esp_usurio_creacion":"mariaf",
        "esp_usuario_modifica":"mariaf"
    }];
    logger.info(req.headers);
    res.send(especialidades);
});

//Exportación de la variable
export default router;