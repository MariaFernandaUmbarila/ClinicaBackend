import { DoctorRepository } from './../api/components/doctores/repository';
import { Doctor } from './../api/components/doctores/model';
import { DoctorServiceImpl } from './../api/components/doctores/service';

//El servicio no recibe request ni response

describe('DoctorService', () => {

    let doctorService:DoctorServiceImpl;
    let doctorRepository:DoctorRepository;

    //Definición de objetos a usar como mock
    beforeEach (() => {
        doctorRepository= {
            getAllDoctors: jest.fn(),
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
                doct_nombre: 'Cristina',
                doct_apellido: 'Molinos', 
                doct_especialidad: 'Pediatria',
                doct_consultorio: '604'
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
});