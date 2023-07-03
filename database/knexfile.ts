import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    development:{
        client: 'pg',
        connection: process.env.POSTGRES_URI,
        migrations:{
            directory: './database/migrations',
            tableName: 'knex_migrations'
        }
    }
};