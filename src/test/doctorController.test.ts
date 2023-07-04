import { DoctorController, DoctorControllerImpl } from './../api/components/doctores/controller';
import { Doctor, DoctorReq } from './../api/components/doctores/model';
import { DoctorService, DoctorServiceImpl } from './../api/components/doctores/service';
import { DoctorRepository } from '../api/components/doctores/repository';
import chai from 'chai';
import chaiHttp from 'chai-http';
import spies from 'chai-spies';
import { Request, Response } from 'express';

//Instancias de la librería
chai.use(chaiHttp);
chai.use(spies);

const expect = chai.expect;

//El mock es lo que se espera de la función, se instancian las
//dependencias necesarias
const doctRepositoryMock:DoctorRepository = {

    createDoctor:async (req:DoctorReq) => {
        const doctor:Doctor = {
            doct_id: 1, 
            doct_nombre: 'Cristina',
            doct_apellido: 'Molinos', 
            doct_especialidad: 'Pediatria',
            doct_consultorio: '604'
        };
        return doctor;
    },
    getAllDoctors:async () => {
        const doctor:Doctor[] = [{
            doct_id: 1, 
            doct_nombre: 'Cristina',
            doct_apellido: 'Molinos', 
            doct_especialidad: 'Pediatria',
            doct_consultorio: '604'
        }];
        return doctor;
    }
};

const doctorService:DoctorService = new DoctorServiceImpl(doctRepositoryMock);
const doctorController:DoctorController = new DoctorControllerImpl(doctorService);

//Mocking del objeto de respuesta

const reqMock = {} as Request;
const resMock = {
    json: chai.spy(),
    status: () => resMock,
} as unknown as Response;

//Describe las funciones a llamar con los mock
describe('DoctorController', () => {
    describe('getAllDoctors', () => {
        it('Todos los doooctores obtenidos', async () => {
            await doctorController.getAllDoctors(reqMock, resMock);
            expect(resMock.json).to.have.been.called.once;
            expect(resMock.json).to.have.been.called.with(
                [{
                    doct_id: 1, 
                    doct_nombre: 'Cristina',
                    doct_apellido: 'Molinos', 
                    doct_especialidad: 'Pediatria',
                    doct_consultorio: '604'
                }]
            );
        })
    });
});