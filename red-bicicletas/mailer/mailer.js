const nodemailer = require('nodemailer')

const mailConfig= {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'mitchel34@ethereal.email',
        pass: 'UaXmqv18y6tauTw6Kk'
    }
}

module.exports = nodemailer.createTransport(mailConfig);