import { PatientRepository } from '../api/components/pacientes/repository';
import { Patient, PatientReq } from '../api/components/pacientes/model';
import { PatientServiceImpl } from '../api/components/pacientes/service';

//El servicio no recibe request ni response

describe('PatientService', () => {

    let patientService:PatientServiceImpl;
    let patientRepository:PatientRepository;

    //Definición de objetos a usar como mock
    beforeEach (() => {
        patientRepository = {
            getAllPatients: jest.fn(),
            getPatientById: jest.fn(),
            createPatient: jest.fn(),
            deletePatientById: jest.fn(),
            updatePatientById: jest.fn(),
            type: "Patient"
        };
        patientService = new PatientServiceImpl(patientRepository);
    });

    describe('getAllPatients', () => {

        //Definición de la prueba para getAllPatients
        it('Deberia listar todos los pacientes desde el servicio', async () => {

            //Instanciacion del modelo a usar
            const patients:Patient[] = [                
                {
                    paci_id: 1,
                    paci_nombre: "Marcela",
                    paci_apellido: "Ospina",
                    paci_identifi: "100786356",
                    paci_telefono: 302587441
                },
                {
                    paci_id: 3,
                    paci_nombre: "Carlos",
                    paci_apellido: "Carranza",
                    paci_identifi: "123744356",
                    paci_telefono: 325777777
                }      
            ];

            //Definición de la respuesta que se espera con jest
            (patientRepository.getAllPatients as jest.Mock).mockResolvedValue(patients);
            //Llamado a la función del servicio
            const result = await patientService.getAllPatients();

            //Se espera que el servicio se haya llamado al menos una vex
            expect(patientRepository.getAllPatients).toHaveBeenCalled();
            //Se espera que el resultado de la respuesta sea el de pacientes
            expect(result).toEqual(patients);

        });

        //Definición de la prueba de error
        it('Deberia retornar un arreglo vacio', async () => {

            //Definición de lo que se espera en la respuesta con jest
            (patientRepository.getAllPatients as jest.Mock).mockResolvedValue([]);

            const result = await patientService.getAllPatients();

            expect(patientRepository.getAllPatients).toHaveBeenCalled();
            expect(result).toEqual([]);

        });
    });

    describe('getPatientById', () => {

        //Definición de la prueba para getAllPatients
        it('Deberia obtener el patient por id', async () => {

            const patientId = 1;
            //Instanciacion del modelo a usar
            const patient:Patient = {
                paci_id: 1,
                paci_nombre: "Marcela",
                paci_apellido: "Ospina",
                paci_identifi: "100786356",
                paci_telefono: 302587441
            };            

            //Definición de la respuesta que se espera con jest
            (patientRepository.getPatientById as jest.Mock).mockResolvedValue(patient);
            //Llamado a la función del servicio
            const result = await patientService.getPatientById(patientId);

            //Se espera que el servicio se haya llamado al menos una vex
            expect(patientRepository.getPatientById).toHaveBeenCalledWith(patientId);
            //Se espera que el resultado de la respuesta sea el de pacientes
            expect(result).toEqual(patient);

        });

        //Definición de la prueba de error
        it('Deberia retornar un arreglo vacio porque el id no existe', async () => {

            const patientId = 5;

            //Definición de lo que se espera en la respuesta con jest
            (patientRepository.getPatientById as jest.Mock).mockResolvedValue(null);

            const result = await patientService.getPatientById(patientId);

            expect(patientRepository.getPatientById).toHaveBeenCalledWith(patientId);
            expect(result).toBeNull();

        });

        it('Deberia lanzar un error si algo diferente falla', async () => {

            const patientId = 1;
            const error = new Error('Database error');

            //Definición de lo que se espera en la respuesta con jest
            (patientRepository.getPatientById as jest.Mock).mockRejectedValue(error);
            
            await expect(patientService.getPatientById(patientId)).rejects.toThrowError(error);
            expect(patientRepository.getPatientById).toHaveBeenCalledWith(patientId);

        });
    });

    describe('createPatient', () => {

        //Definición de la prueba para createPatient
        it('Deberia crear al paciente desde el servicio', async () => {

            //Instanciacion del modelo del response
            const patientRes:Patient[] = [{
                paci_id: 4,
                paci_nombre: "Alirio",
                paci_apellido: "Carranza",
                paci_identifi: "123744357",
                paci_telefono: 1258888
            }];
            //Instanciación del modelo del request
            const doctReq:PatientReq = {
                paci_nombre: "Diego",
                paci_apellido: "Caceres",
                paci_identifi: "533744356",
                paci_telefono: 1258888
            };

            //Definición de la respuesta que se espera con jest
            (patientRepository.createPatient as jest.Mock).mockResolvedValue(patientRes);
            //Llamado a la función del servicio
            const result = await patientService.createPatient(doctReq);

            //Se espera que el servicio se haya llamado al menos una vex
            expect(patientRepository.createPatient).toHaveBeenCalledWith(doctReq);
            //Se espera que el resultado de la respuesta sea el de pacientes
            expect(result).toEqual(patientRes);

        });

        //Definición de la prueba de error
        it('Deberia retornar un error en la creacion', async () => {

            //Definición de lo que se espera en la respuesta con jest
            const error = new Error('Internal Server Error');

            //Instanciación del modelo del request
            const doctReq:PatientReq = {
                paci_nombre: "Diego",
                paci_apellido: "Caceres",
                paci_identifi: "533744356",
                paci_telefono: 1258888
            };

            //Definición de lo que se espera en la respuesta con jest
            (patientRepository.createPatient as jest.Mock).mockRejectedValue(error);

            //Esperar a que se ejecute para que pase por el middleware
            await expect(patientService.createPatient(doctReq)).rejects.toThrowError(error);
            expect(patientRepository.createPatient).toHaveBeenCalledWith(doctReq);

        });
    });
});