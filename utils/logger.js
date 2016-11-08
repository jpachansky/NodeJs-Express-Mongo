import winston from 'winston';
import config from '../config';
import path from 'path';

const appDir = path.dirname(require.main.filename);

const logger = new (winston.Logger)({
    level: 'verbose',
    transports: [
        new (winston.transports.Console)({
            level: config.logging.level
        }),
        new (winston.transports.File)({
            filename: appDir + '/server.log',
            level: config.logging.level
        })
    ]
});

module.exports = logger;