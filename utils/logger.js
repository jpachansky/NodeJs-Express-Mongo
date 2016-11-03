const winston = require("winston");
const config = require("../config");

var appDir = require('path').dirname(require.main.filename);

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