const express = require('express');
const ConnectDB = require('./db');
var cors = require('cors');

ConnectDB();
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// /// schema 
const Users = require('./model/users');


// // require routes
const signup = require('./MVC/signup');
const login = require('./MVC/login');
/// /// endpoint & router

app.post('/signup', signup);
app.post('/login',login);



app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}`));