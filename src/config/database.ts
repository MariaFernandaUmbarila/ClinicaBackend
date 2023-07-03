import { knex } from "knex";

//Configuración de base de datos
export const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5433,
        database: 'clinica_backend',
        user: 'postgres',
        password: 'changeme'
    }
});

export default db;