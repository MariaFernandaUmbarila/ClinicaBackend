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

# Tareas y mejoras realizadas

- [x] **Cambiar el customErrors de config a utils**. El archivo con los errores personalizados puede encontrarse [aquí](https://github.com/MariaFernandaUmbarila/ClinicaBackend/blob/main/src/utils/customerrors.ts).

- [x] **Terminar el crud de citas y pacientes**. Se finalizó con el CRUD completo de citas y pacientes, como se puede comprobar al probar los endpoints en Postman y al mirar el archivo `routes` de cada componente.

- [ ] **Validación de que el doctor exista antes de crear la cita en el service**.

- [ ] **Completar por lo menos los test de citas o pacientes**

- [x] **Cambiar los errores específicos por errores genéricos que se puedan adecuar**. Los errores se manejan con un switch case, que establece los valores a usar según el tipo de componente ingresado como parámetro. En cada componente, la variable que controla el tipo de error es `private type`. Por ejemplo, para mandar un error customizable desde el servicio de `createDoctor` se usa:

```
private type = "Doctor";

public createDoctor(doctorReq:DoctorReq): Promise<Doctor> {
        try{
            return this.doctorRepository.createDoctor(doctorReq);
        } catch (error){
            throw new CreateError(this.type);
        }        
    }
```