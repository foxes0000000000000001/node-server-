const express = require('express');

const bcrypt = require('bcrypt');  //encriptar la contraseña del usuario 
const _ = require('underscore');

const Registro = require('../models/usuario');

const app = express();

app.get('/usuario', function (req, res){
                        //muestra los campos que requiras 
    Registro.find({}, /*'nombre email estado' */)
             .limit(5)  
             .exec((err, usuarios) =>{
        
                if(err){
                  return res.status(400).json({
                        ok: false,
                        err
                    });  
                }
        
                Registro.count({}, (err, conteo) =>{
                    
                    res.json({
                        ok: true,
                        usuarios,
                        regitros: conteo
                    });
                    
                });
                        
             });
  
});

app.post('/usuario', function(req, res) {
//esquema usuario    
        
        let body = req.body;
        console.log("rol de body", req.body.rol)
    
        let usuario = new Registro()
        usuario.nombre = req.body.nombre
        usuario.email = req.body.email
        usuario.password = bcrypt.hashSync(req.body.password, 10)
        usuario.rol = req.body.rol
        
        console.log("rol de registro", usuario.rol)
    
 //guardar en DB    
    usuario.save( (err, usuarioDB) => {
        if(err){                         //formatear respuesta como json 
            return res.status(400).json({
                ok: false,
                err
            });
        } 
        
        usuarioDB.password = null;
        
        res.json({
            ok: true,
            usuario: usuarioDB 
        });
        
    });

});

app.put('/usuario/:id', function (req, res) {
    
    let id = req.params.id;
    let body = _.pick( req.body , ['nombre', 'email', 'img', 'estado']);
                //pick es parte de la libreria underscore y hace que puedas elegir que valores actualizar 
    
    
    Registro.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }
        
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
 
});

app.delete('/usuario/:id', function (req, res) {
    
    let id = req.params.id;
    
    //Registro.findByIdAndRemove(id, (err, usuarioDelete) =>{
    Registro.findByIdAndUpdate(id, {estado: false}, {new: true}, (err, usuarioDelete) =>{
        
       if(err){
           return res.status(400).json({
                ok: false,
                err
            });
       };        
        
        
       if(!usuarioDelete){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });  
       }
        res.json({
            ok:true,
            usuario: usuarioDelete
        });
        
    });
  
});

module.exports = app;
 
