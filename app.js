const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');


const clientRoutes = require('./api/routes/clients');


const app = express()
  .use(bodyParser.json())

  app.use((req, res, next) => {
    console.log('came')
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-With-Headers",
    "Origin, X-Requsted-With, Content-Type, Accept, Athorization");
    if(res.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  mongoose.connect('mongodb://127.0.0.1:27017/db',
  {useNewUrlParser:true,useUnifiedTopology:true})
  .then(()=>{
      console.log('connected');
  });
  
  app.use('/clients',clientRoutes);

  

mongoose.Promise = global.Promise;




module.exports = app;