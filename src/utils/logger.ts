const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat =  printf(({ level, message, timestamp}: {level: string, message: string, timestamp:string}) => {
    return `${timestamp}-${level}: ${message}`;
});

//Librería para loggers de los procesos
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({
            filename: 'logs/combined.log'
        }),
        new transports.File({
            filename: 'logs/error.log',
            level: 'error'
        })
    ]
});

//Se exporta el objeto para su uso
export default logger;