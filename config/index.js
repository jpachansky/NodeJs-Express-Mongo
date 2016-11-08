module.exports = (function (env) {
    let config = {};
    switch (env) {
        case 'production':
            config = require('./production');
            break;

        case 'development':
            config = require('./development');
            break;

        case 'test':
            config = require('./test');
            break;

        default:
            console.error('NODE_ENV environment variable not set');
            process.exit(1);
    }

    return config;
})(process.env.NODE_ENV);