import dotenv from 'dotenv';

dotenv.config();

//Configuración para conexión a bd
module.exports = {
    development:{
        client: 'pg',
        connection: {
            host:'localhost',
            user: 'postgres',
            password: 'changeme',
            database: 'clinica_backend',
            port: 5433
        },
        migrations:{
            directory: './migrations',
            tableName: 'knex_migrations'
        }
    }
};