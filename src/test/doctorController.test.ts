import { DoctorController, DoctorControllerImpl } from './../api/components/doctores/controller';
import { Doctor, DoctorReq } from './../api/components/doctores/model';
import { DoctorService, DoctorServiceImpl } from './../api/components/doctores/service';
import { DoctorRepository } from '../api/components/doctores/repository';
import { Request, Response } from 'express';

const mockReq = {} as Request;
const mockRes = {} as Response;

describe('DoctorController', () => {

    let doctorService:DoctorService;
    let doctorController:DoctorController;

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
        it('Deberia listar todos los doctores', async () => {

            //Instanciacion del modelo a usar
            const doctors:Doctor[] = [{
                doct_id: 1, 
                doct_nombre: 'Cristina',
                doct_apellido: 'Molinos', 
                doct_especialidad: 'Pediatria',
                doct_consultorio: '604'
            }];

            (doctorService.getAllDoctors as jest.Mock).mockResolvedValue(doctors);
            await doctorController.getAllDoctors(mockReq, mockRes);

            //Se espera que el servicio se haya llamado al menos una vex
            expect(doctorService.getAllDoctors).toHaveBeenCalled();
            //Se espera que el JSON de la respuesta sea el de doctors
            expect(mockRes.json).toHaveBeenCalledWith(doctors);
            //Se espera que el código de la respuesta sea 200
            expect(mockRes.status).toHaveBeenCalledWith(200);
        });
    });
});