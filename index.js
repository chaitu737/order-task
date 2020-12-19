const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const router = require('./routes/order');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");



app.use(cors());



app.use(express.static(path.join(__dirname, "client")));



//mlab connection
mongoose.connect('mongodb://localhost:27017/orders');

mongoose.Promise=global.Promise;

mongoose.set('debug', true);

//secure headers
app.use(helmet());
app.use(helmet.referrerPolicy({
    policy:'same-origin'
}));
const limit = rateLimit({
    max: 100,// max requests
    windowMs: 60 * 60 * 1000, // 1 Hour of 'ban' / lockout 
    message: 'Too many requests' // message to send
});
app.use('/api', limit); // Setting limiter on specific route





app.use(express.json({ limit: '10kb' })); // Body limit is 10

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(mongoSanitize());


app.use(xss());   // for security

app.use('/api', require('./routes/order'));  // handling routes



app.use(function(err,req,res,next){

    res.status(422).send(({error:err.message}));
    });

app.listen(process.env.port || 3000, ()=>{
    console.log('App is listening for requests');
})