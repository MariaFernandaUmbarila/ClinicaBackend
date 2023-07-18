# Actividad unidad 6 - Todos a la U - Backend Intermedio

**Estado: en progreso**

*María Fernanda Umbarila Suárez - 2023*

El presente proyecto está hecho en Express y corresponde al desarrollo de la actividad descrita para el módulo. Se usó PostgreSQL como motor de base de datos. Adicionalmente se cambiaron los nombres de algunas variables y la implementación de algunos métodos, esto para mejorar la comprensión de todos los procesos realizados.

**Versiones**

+ NodeJS: 18.15.0
+ Docker: 24.0.2
+ PostgreSQL: última imagen traída desde el repositorio de Docker

---

## Pasos para ejecutar el proyecto en máquina local

1. En el directorio raíz del proyecto instalar las dependencias del proyecto con el comando `npm install`.

2. Iniciar el contenedor de PostgreSQL en el directorio raíz con el comando `docker compose up`.

3. Realizar las migraciones de base de datos. En la carpeta `src/database` ejecutar el comando `npx knex migrate:latest`.

4. Iniciar el servidor con el comando `npx ts-node src/app.ts`.

5. Para probar los endpoints en Postman importar la colección del archivo `postman_collection.json`.

6. Para ejecutar los test, ejecutar en el directorio raíz el comando `npx jest`.

---

# Tareas para realizar

- [x] **Cambiar el customErrors de config a utils**. El archivo con los errores personalizados puede encontrarse [aquí](https://github.com/MariaFernandaUmbarila/ClinicaBackend/blob/main/src/utils/customerrors.ts).

- [x] **Cambiar los errores específicos por errores genéricos que se puedan adecuar**. Los errores se manejan con un switch case, que establece los valores a usar según el tipo de componente ingresado como parámetro. Por ejemplo:

```
class GetAllError extends Error{

    constructor(type:string){
        switch(type) { 
            case "Doctor":{ 
                super("Fallo al obtener la lista de doctores");
                this.name = 'DoctorGetAllError';
                break; 
            } 
            case "Patient":{ 
                super("Fallo al obtener la lista de pacientes");
                this.name = 'PatientGetAllError';
                break; 
            } 
            case "Appointment":{ 
                super("Fallo al obtener la lista de citas");
                this.name = 'AppointmentGetAllError';
                break; 
            } 
            default: { 
                super("Fallo no identificado en obtener todos");
                this.name = 'ErrorNotIdentifiedGetAll';
                break; 
            } 
        }         
    }
}
```