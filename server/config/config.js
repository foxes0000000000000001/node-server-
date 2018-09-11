
//===========================
//PUERTO
//===========================

process.env.PORT = process.env.PORT || 3000;

//===========================
//ENTORNO 
//===========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===========================
//Bse de Datos 
//===========================

let urlDB;

//if(process.env.NODE_ENV === 'dev'){
//   urlDB ='mongodb://localhost:27017/cafe'; 
//}else{
    urlDB= 'mongodb://cafe-user:fatewbk201@ds143990.mlab.com:43990/cafe';
//}

process.env.URLDB = urlDB;
