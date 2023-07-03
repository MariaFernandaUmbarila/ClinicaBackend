import {Knex} from 'knex'

export async function up(knex:Knex): Promise<void> {
    //Creación de las tablas
    await knex.raw(

        `
        CREATE TABLE IF NOT EXISTS doctores (
            doct_id bigserial,
            doct_nombre VARCHAR, 
            doct_apellido VARCHAR, 
            doct_especialidad VARCHAR,
            doct_consultorio VARCHAR,
            doct_correo VARCHAR,
            doct_created_at timestamptz,
            doct_updated_at timestamptz,
            PRIMARY key(doct_id)
        );

        CREATE TABLE IF NOT EXISTS pacientes (
            paci_id bigserial,
            paci_nombre VARCHAR, 
            paci_apellido VARCHAR, 
            paci_identif VARCHAR UNIQUE,
            paci_telefono INT,
            paci_created_at timestamptz,
            paci_updated_at timestamptz,
            PRIMARY key(paci_id)
        );

        CREATE TABLE IF NOT EXISTS citas (
            cita_id bigserial,
            cita_horario VARCHAR,
            cita_especialidad VARCHAR,
            cita_doct_id BIGINT,
            cita_paci_identif VARCHAR,
            cita_created_at timestamptz,
            cita_updated_at timestamptz,
            PRIMARY key(cita_id),
            CONSTRAINT fk_doctores
            FOREIGN KEY (cita_doct_id)
            REFERENCES doctores(doct_id),
            CONSTRAINT fk_pacientes
            FOREIGN KEY (cita_paci_identif)
            REFERENCES pacientes(paci_identif)
        );

        `
    )
}

export async function down(knex: Knex): Promise<void> {
    //Eliminación de las tablas
    await knex.raw(
        `
        DROP TABLE doctores;
        DROP TABLE pacientes;
        DROP TABLE citas;
        `
    )
}