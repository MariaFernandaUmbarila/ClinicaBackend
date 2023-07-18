import { PatientController, PatientControllerImpl } from '../api/components/pacientes/controller';
import { Patient, PatientReq } from '../api/components/pacientes/model';
import { PatientService } from '../api/components/pacientes/service';
import { Request, Response } from 'express';

const mockReq = {} as Request;
const mockRes = {} as Response;

describe('PatientController', () => {

    let patientService:PatientService;
    let patientController:PatientController;

    //Definición de objetos a usar como mock
    beforeEach (() => {
        patientService = {
            getAllPatients: jest.fn(),
            getPatientById: jest.fn(),
            createPatient: jest.fn() ,
            deletePatientById: jest.fn(),
            updatePatientById: jest.fn()
        };
        patientController = new PatientControllerImpl(patientService);
        mockRes.status = jest.fn().mockReturnThis();
        mockRes.json = jest.fn().mockReturnThis();
    });

    describe('getAllPatients', () => {

        //Definición de la prueba para getAllPatients
        it('Deberia listar todos los pacientes', async () => {

            //Instanciacion del modelo a usar
            const patients:Patient[] = [{
                paci_id: 1,
                paci_nombre: "Marcela",
                paci_apellido: "Ospina",
                paci_identifi: "100786356",
                paci_telefono: 302587441
            }];

            //Definición de la respuesta que se espera con jest
            (patientService.getAllPatients as jest.Mock).mockResolvedValue(patients);
            //Llamado a la función del controlador
            await patientController.getAllPatients(mockReq, mockRes);

            //Se espera que el servicio se haya llamado al menos una vex
            expect(patientService.getAllPatients).toHaveBeenCalled();
            //Se espera que el JSON de la respuesta sea el de pacientes
            expect(mockRes.json).toHaveBeenCalledWith(patients);
            //Se espera que el código de la respuesta sea 200
            expect(mockRes.status).toHaveBeenCalledWith(200);
        });

        //Definición de la prueba de error
        it('Deberia manejar el error correctamente', async () => {

            //Definición de lo que se espera en la respuesta con jest
            const error = new Error('Internal Server Error');
            (patientService.getAllPatients as jest.Mock).mockRejectedValue(error);

            await patientController.getAllPatients(mockReq, mockRes);

            expect(patientService.getAllPatients).toHaveBeenCalled();
            expect(mockRes.json).toHaveBeenCalledWith({message: 'Error trayendo pacientes'});
            expect(mockRes.status).toHaveBeenCalledWith(400);

        });
    });

    describe('getPatientById', () => {
        it('Deberia obtener el paciente por id', async () => {

            const patientRes:Patient[] = [{
                paci_id: 1,
                paci_nombre: "Marcela",
                paci_apellido: "Ospina",
                paci_identifi: "100786356",
                paci_telefono: 302587441
            }];

            (mockReq.params) = {id:"1"};
            //Definición de la respuesta que se espera con jest
            (patientService.getPatientById as jest.Mock).mockResolvedValue(patientRes);          

            //Llamado a la función del controlador
            await patientController.getPatientById(mockReq, mockRes);

            //Se espera que el servicio se haya llamado al menos una vex
            expect(patientService.getPatientById).toHaveBeenCalledWith(1);
            //Se espera que el JSON de la respuesta sea el de pacientes
            expect(mockRes.json).toHaveBeenCalledWith(patientRes);
            //Se espera que el código de la respuesta sea 200
            expect(mockRes.status).toHaveBeenCalledWith(200);
        });

        it('Deberia manejar el error correctamente y retornar 400', async () => {

            (mockReq.params) = {id: "1"};
            (patientService.getPatientById as jest.Mock).mockResolvedValue(null);

            await patientController.getPatientById(mockReq, mockRes);

            expect(patientService.getPatientById).toHaveBeenCalledWith(1);
            expect(mockRes.json).toHaveBeenCalledWith({error: 'Fallo al obtener el paciente dado el id'});
            expect(mockRes.status).toHaveBeenCalledWith(400);

        });

        it('Deberia retornar 400 si otro error ocurre', async () => {

            //Definición de lo que se espera en la respuesta con jest
            const error = new Error('Internal Server Error');

            (mockReq.params) = {id: "1"};
            (patientService.getPatientById as jest.Mock).mockRejectedValue(error);

            await patientController.getPatientById(mockReq, mockRes);

            expect(patientService.getPatientById).toHaveBeenCalledWith(1);
            expect(mockRes.json).toHaveBeenCalledWith({error: 'Error trayendo paciente por id'});
            expect(mockRes.status).toHaveBeenCalledWith(400);

        });
    });

    describe('createPatient', () => {

        //Definición de la prueba para createPatient
        it('Deberia crear el paciente y retornar su informacion', async () => {

            //Instanciacion del modelo del response
            const patientRes:Patient[] = [{
                paci_id: 4,
                paci_nombre: "Esperanza",
                paci_apellido: "Cruz",
                paci_identifi: "52478115",
                paci_telefono: 300587841
            }];
            //Instanciación del modelo del request
            const doctReq:PatientReq = {
                paci_nombre: "Esperanza",
                paci_apellido: "Cruz",
                paci_identif: "52478115"
            };

            //Se establece el body del request
            (mockReq.body as PatientReq) = doctReq;
            //Definición de la respuesta que se espera con jest
            (patientService.createPatient as jest.Mock).mockResolvedValue(patientRes);

            //Llamado a la función del controlador
            await patientController.createPatient(mockReq, mockRes);

            //Se espera que el servicio se haya llamado al menos una vex
            expect(patientService.createPatient).toHaveBeenCalledWith(doctReq);
            //Se espera que el JSON de la respuesta sea el de pacientes
            expect(mockRes.json).toHaveBeenCalledWith(patientRes);
            //Se espera que el código de la respuesta sea 200
            expect(mockRes.status).toHaveBeenCalledWith(201);
        });

        //Definición de la prueba de error
        it('Deberia manejar el error correctamente con Joi', async () => {

            //Definición de lo que se espera en la respuesta con jest
            const error = new Error('Internal Server Error');

            (mockReq.body) = {};
            (patientService.createPatient as jest.Mock).mockRejectedValue(error);

            await patientController.createPatient(mockReq.body, mockRes);

            expect(mockRes.json).toHaveBeenCalledWith({error: 'Internal Server Error'});
            expect(mockRes.status).toHaveBeenCalledWith(400);

        });
    });
});