var mongoose = require('mongoose');
var Reserva = require('./reserva');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
const uniqueValidator = require('mongoose-unique-validator');
const saltRounds = 10;


const Token = require('../models/token');
const mailer = require('../mailer/mailer');

var Schema = mongoose.Schema;

const validateEmail = function(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

var usuarioSchema = new Schema ({
    nombre: {
        type: String,
        trin: true,
        required: [true, 'El nombre es obligatorio'],
    },
    email: {
        type: String,
        trin: true,
        required: [true, 'el email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor ingresa un email válido'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/]
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, {message: 'El {PATH} ya existe con otro usuario'});

usuarioSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, saltRounds);    
    }
    next();
});

usuarioSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reserva = new Reserva({
        usuario: this._id, 
        bicicleta: biciId,
        desde: desde,
        hasta: hasta
    });
    console.log(reserva);
    reserva.save(cb);
};


usuarioSchema.methods.enviar_email_bienvenida = function(cb){
    const token = new Token({
        _userId: this.id, token: crypto.randomBytes(16).toString('hex')
    });
    const email_destination = this.email;
    token.save(function(err){
        if (err) {return consol.log(err.message);}

        const mailOptions = {
            from: 'no-replyredbicicletas.com',
            to: email_destination,
            subject: 'verificación de cuenta',
            text: 'Hola \n\n' + 'Por favor, para verificar tu cuenta haz click en el siguiente link_ \n' + 'http://localhost:3000' + '\/token/confirmation\/' + token.token + '.\n'
        };
        mailer.sendMail(mailOptions, function(err){
            if (err) { return console.log(err.message); }

            console.log("A verigication email has been sent to "+ email_destination);
        })
    })
};

module.exports = mongoose.model('Usuario', usuarioSchema);