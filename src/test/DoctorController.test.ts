import { DoctorController, DoctorControllerImpl } from './../api/components/doctores/controller';
import { Doctor, DoctorReq } from './../api/components/doctores/model';
import { DoctorService } from './../api/components/doctores/service';
import { Request, Response } from 'express';

const mockReq = {} as Request;
const mockRes = {} as Response;

describe('DoctorController', () => {

    let doctorService:DoctorService;
    let doctorController:DoctorController;

    //Definición de objetos a usar como mock
    beforeEach (() => {
        doctorService = {
            getAllDoctors: jest.fn(),
            createDoctor: jest.fn()
        };
        doctorController = new DoctorControllerImpl(doctorService);
        mockRes.status = jest.fn().mockReturnThis();
        mockRes.json = jest.fn().mockReturnThis();
    });

    describe('getAllDoctors', () => {

        //Definición de la prueba para getAllDoctor
        it('Deberia listar todos los doctores', async () => {

            //Instanciacion del modelo a usar
            const doctors:Doctor[] = [{
                doct_id: 1, 
                doct_nombre: 'Cristina',
                doct_apellido: 'Molinos', 
                doct_especialidad: 'Pediatria',
                doct_consultorio: '604'
            }];

            //Definición de la respuesta que se espera con jest
            (doctorService.getAllDoctors as jest.Mock).mockResolvedValue(doctors);
            //Llamado a la función del controlador
            await doctorController.getAllDoctors(mockReq, mockRes);

            //Se espera que el servicio se haya llamado al menos una vex
            expect(doctorService.getAllDoctors).toHaveBeenCalled();
            //Se espera que el JSON de la respuesta sea el de doctors
            expect(mockRes.json).toHaveBeenCalledWith(doctors);
            //Se espera que el código de la respuesta sea 200
            expect(mockRes.status).toHaveBeenCalledWith(200);
        });

        //Definición de la prueba de error
        it('Deberia manejar el error correctamente', async () => {

            //Definición de lo que se espera en la respuesta con jest
            const error = new Error('Internal Server Error');
            (doctorService.getAllDoctors as jest.Mock).mockRejectedValue(error);

            await doctorController.getAllDoctors(mockReq, mockRes);

            expect(doctorService.getAllDoctors).toHaveBeenCalled();
            expect(mockRes.json).toHaveBeenCalledWith({message: 'Error trayendo doctores'});
            expect(mockRes.status).toHaveBeenCalledWith(400);

        });
    });

    describe('createDoctor', () => {

        //Definición de la prueba para createDoctors
        it('Deberia crear el doctor y retornar su informacion', async () => {

            //Instanciacion del modelo del response
            const doctorRes:Doctor[] = [{
                doct_id: 9, 
                doct_nombre: 'Roberta',
                doct_apellido: 'Salazar', 
                doct_especialidad: 'Medicina general',
                doct_consultorio: '404',
                doct_correo: 'rsalazar@gmail.com'
            }];
            //Instanciación del modelo del request
            const doctReq:DoctorReq = {
                doct_nombre: 'Roberta',
                doct_apellido: 'Salazar', 
                doct_especialidad: 'Medicina general',
                doct_consultorio: '404',
                doct_correo: 'rsalazar@gmail.com'
            };

            //Se establece el body del request
            (mockReq.body as DoctorReq) = doctReq;
            //Definición de la respuesta que se espera con jest
            (doctorService.createDoctor as jest.Mock).mockResolvedValue(doctorRes);

            //Llamado a la función del controlador
            await doctorController.createDoctor(mockReq, mockRes);

            //Se espera que el servicio se haya llamado al menos una vex
            expect(doctorService.createDoctor).toHaveBeenCalledWith(doctReq);
            //Se espera que el JSON de la respuesta sea el de doctors
            expect(mockRes.json).toHaveBeenCalledWith(doctorRes);
            //Se espera que el código de la respuesta sea 200
            expect(mockRes.status).toHaveBeenCalledWith(201);
        });

        //Definición de la prueba de error
        it('Deberia manejar el error correctamente', async () => {

            //Definición de lo que se espera en la respuesta con jest
            const error = new Error('Internal Server Error');

            (mockReq.body) = {};
            (doctorService.createDoctor as jest.Mock).mockRejectedValue(error);

            await doctorController.createDoctor(mockReq, mockRes);

            expect(doctorService.createDoctor).toHaveBeenCalledWith({});
            expect(mockRes.json).toHaveBeenCalledWith({message: 'Internal Server Error'});
            expect(mockRes.status).toHaveBeenCalledWith(400);

        });
    });
});