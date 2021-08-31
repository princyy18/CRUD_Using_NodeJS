const express = require('express');
const dotenv  = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
const connectDB = require('./server/database/connectiondb');
dotenv.config({path:'config.env'});

PORT= process.env.PORT || 3000;
//log requests
app.use(morgan('tiny'));

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

// mongodb connection
connectDB();
//set view engine
app.set("view engine",'ejs');

//load assets(virtual path)
app.use('/css',express.static(path.resolve(__dirname,'public/css')));
app.use('/js',express.static(path.resolve(__dirname,'public/js')));
app.use('/img',express.static(path.resolve(__dirname,'public/img')));
//css/style.css

//load routes
app.use('/',require('./server/routes/router'));

console.log(path.resolve(__dirname,'public/css'));
app.listen(PORT,()=>
{
    console.log(`server is running on http://localhost:${PORT}`);
});













