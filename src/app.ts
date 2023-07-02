import express, {Request, Response} from 'express';

const app = express();
const port = 8087;

//Convierte todos los bodies de los request en JSON
app.use(express.json);

app.get('/api/v1/listar_especialidades', (req: Request, res: Response) => {
    const especialidades = [{
        "_id":1,
        "esp_nombre":"Medicina general",
        "esp_usurio_creacion":"mariaf",
        "esp_usuario_modifica":"mariaf"
    }];
    res.json(especialidades);
});

app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ' + port);
});