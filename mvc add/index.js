require("dotenv").config();

const express = require('express');
const ConnectDB = require('./db');
var cors = require('cors');

ConnectDB();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// /// schema 
const Users = require('./model/users');


// // require routes
const {signup ,SIGNUP_ExpressValidation}= require('./MVC/signup');
const {Login , LOGIN_ExpressValidation} = require('./MVC/login');
/// /// endpoint & router

app.post('/signup',SIGNUP_ExpressValidation, signup);
app.post('/login',LOGIN_ExpressValidation,Login);



app.get('/', (req, res) => res.send('Hello World! vinayak'));
app.listen(port, () => console.log(`Example app listening on port ${port}`));