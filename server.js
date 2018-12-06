//
require('./models/db');
/*To start express server*/
const express = require('express');

const path = require('path');

const exphbs = require('express-handlebars');

const bodyparser =require('body-parser');



const employeeController=require('./controllers/employeeControllers');


/* call express server with variable app*/
var app =express();

//
app.use(bodyparser.urIencoded({
    extended:true
}));
/*to convert in json*/
app.use(bodyparser.json());

/* express middleware for handlebars*/
app.set('views',path.join(__dirname,'/views/'));


/* express engine for handlebars*/
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout', layoutsDir:__dirname + '/views/layout/'}));

/* view engine as hbs*/
app.set('view engine','hbs');

 


/* To start the server call listen function with app variable and pass two parameter 
 first port 3000 also second callback function for sucess message*/
app.listen(3000,()=>{
    console.log('express server started:3000');
});

app.use('/employee', employeeController);
/* in order to run this app cmd nodemon server.js*/