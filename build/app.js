"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3030;
//Convierte todos los bodies de los request en JSON
app.use(express_1.default.json);
app.get('/api/v1/listar_especialidades', (req, res) => {
    const especialidades = [{
            "_id": 1,
            "esp_nombre": "Medicina general",
            "esp_usurio_creacion": "mariaf",
            "esp_usuario_modifica": "mariaf"
        }];
    res.send(especialidades);
});
app.listen(port, 'localhost', () => {
    console.log('Servidor escuchando en el puerto ' + port);
});
