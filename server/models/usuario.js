
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({ 
    nombre:{
        type: String,
        required: [true, 'El nombre es nesesario']
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'El correo es reuquerido']
    },
    password:{ 
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String,
        required: false
    },
    rol:{
        type: String, 
        enum: rolesValidos
    },
    estado:{
        type: Boolean,
        default: true 
    },
    google:{
        type: Boolean,
        default: true
    }
});

usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObjet = user.toObject();
    delete userObjet.password;
    
    return userObjet;
}

//                                                //pat imprime el valor requerido 
usuarioSchema.plugin( uniqueValidator, {message: '{PATH} debe de ser unico'});

module.exports = mongoose.model('Registro', usuarioSchema);