import { DoctorRepository } from '../api/components/doctores/repository';
import { Doctor, DoctorReq } from '../api/components/doctores/model';
import { DoctorServiceImpl } from '../api/components/doctores/service';

//El servicio no recibe request ni response

describe('DoctorService', () => {

    let doctorService:DoctorServiceImpl;
    let doctorRepository:DoctorRepository;

    //Definición de objetos a usar como mock
    beforeEach (() => {
        doctorRepository= {
            getAllDoctors: jest.fn(),
            getDoctorById: jest.fn(),
            createDoctor: jest.fn()
        };
        doctorService= new DoctorServiceImpl(doctorRepository);
    });

    describe('getAllDoctors', () => {

        //Definición de la prueba para getAllDoctors
        it('Deberia listar todos los doctores desde el servicio', async () => {

            //Instanciacion del modelo a usar
            const doctors:Doctor[] = [{
                doct_id: 1, 
                doct_nombre: 'Tatiana',
                doct_apellido: 'Jaramillo', 
                doct_especialidad: 'Anestesiología',
                doct_consultorio: '309'
            }];

            //Definición de la respuesta que se espera con jest
            (doctorRepository.getAllDoctors as jest.Mock).mockResolvedValue(doctors);
            //Llamado a la función del servicio
            const result = await doctorService.getAllDoctors();

            //Se espera que el servicio se haya llamado al menos una vex
            expect(doctorRepository.getAllDoctors).toHaveBeenCalled();
            //Se espera que el resultado de la respuesta sea el de doctors
            expect(result).toEqual(doctors);

        });

        //Definición de la prueba de error
        it('Deberia retornar un arreglo vacio', async () => {

            //Definición de lo que se espera en la respuesta con jest
            (doctorRepository.getAllDoctors as jest.Mock).mockResolvedValue([]);

            const result = await doctorService.getAllDoctors();

            expect(doctorRepository.getAllDoctors).toHaveBeenCalled();
            expect(result).toEqual([]);

        });
    });

    describe('getDoctorById', () => {

        //Definición de la prueba para getAllDoctors
        it('Deberia obtener el doctor por id', async () => {

            const doctorId = 1;
            //Instanciacion del modelo a usar
            const doctor:Doctor = {
                doct_id: doctorId, 
                doct_nombre: 'Tatiana',
                doct_apellido: 'Jaramillo', 
                doct_especialidad: 'Anestesiología',
                doct_consultorio: '309'
            };            

            //Definición de la respuesta que se espera con jest
            (doctorRepository.getDoctorById as jest.Mock).mockResolvedValue(doctor);
            //Llamado a la función del servicio
            const result = await doctorService.getDoctorById(doctorId);

            //Se espera que el servicio se haya llamado al menos una vex
            expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(doctorId);
            //Se espera que el resultado de la respuesta sea el de doctors
            expect(result).toEqual(doctor);

        });

        //Definición de la prueba de error
        it('Deberia retornar un arreglo vacio porque el id no existe', async () => {

            const doctorId = 5;

            //Definición de lo que se espera en la respuesta con jest
            (doctorRepository.getDoctorById as jest.Mock).mockResolvedValue(null);

            const result = await doctorService.getDoctorById(doctorId);

            expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(doctorId);
            expect(result).toBeNull();

        });

        it('Deberia lanzar un error si algo diferente falla', async () => {

            const doctorId = 1;
            const error = new Error('Database error');

            //Definición de lo que se espera en la respuesta con jest
            (doctorRepository.getDoctorById as jest.Mock).mockRejectedValue(error);
            
            await expect(doctorService.getDoctorById(doctorId)).rejects.toThrowError(error);
            expect(doctorRepository.getDoctorById).toHaveBeenCalledWith(doctorId);

        });
    });

    describe('createDoctor', () => {

        //Definición de la prueba para createDoctor
        it('Deberia crear al doctor desde el servicio', async () => {

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

            //Definición de la respuesta que se espera con jest
            (doctorRepository.createDoctor as jest.Mock).mockResolvedValue(doctorRes);
            //Llamado a la función del servicio
            const result = await doctorService.createDoctor(doctReq);

            //Se espera que el servicio se haya llamado al menos una vex
            expect(doctorRepository.createDoctor).toHaveBeenCalledWith(doctReq);
            //Se espera que el resultado de la respuesta sea el de doctors
            expect(result).toEqual(doctorRes);

        });

        //Definición de la prueba de error
        it('Deberia retornar un error en la creacion', async () => {

            //Definición de lo que se espera en la respuesta con jest
            const error = new Error('Internal Server Error');

            const doctorRes:Doctor[] = [{
                doct_id: 9, 
                doct_nombre: 'Roberta',
                doct_apellido: 'Salazar', 
                doct_especialidad: 'Medicina general',
                doct_consultorio: '404',
                doct_correo: 'rsalazar@gmail.com'
            }];
            const doctReq:DoctorReq = {
                doct_nombre: 'Roberta',
                doct_apellido: 'Salazar', 
                doct_especialidad: 'Medicina general',
                doct_consultorio: '404',
                doct_correo: 'rsalazar@gmail.com'
            };

            //Definición de lo que se espera en la respuesta con jest
            (doctorRepository.createDoctor as jest.Mock).mockRejectedValue(error);

            //Esperar a que se ejecute para que pase por el middleware
            await expect(doctorService.createDoctor(doctReq)).rejects.toThrowError(error);
            expect(doctorRepository.createDoctor).toHaveBeenCalledWith(doctReq);

        });
    });
});