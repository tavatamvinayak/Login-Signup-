const express = require('express')
const dbConnect = require('./dbConnect')
const cors = require('cors')
const bodyParser = require('body-parser')

// schema  
const Login = require('./schema/Login')


dbConnect();// database connect 
const app = express()

app.use(cors())
app.use(express.json())

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());



//  // // Simple signUp and Login    === Start

// login user already exist then he has login
app.post('/login', async (req, res) => {

    const Users = new Login();
    Users.Email = req.body.Email;
    Users.Password = req.body.Password;

    const loginUserFind = await Login.findOne({ Email: req.body.Email })

    try {
        if (loginUserFind.Password === req.body.Password) {
            res.send("successfuly login " + `send responce file WEB PAGE`).status(200)
        }
    } catch (error) {
        console.log("invalid Account ")
        res.send("invalid Account ").status(400)
    }

});


// signup create account
app.post('/signup', async (req, res) => {

    // schema 
    const Users = new Login();
    Users.Fname = req.body.Fname;
    Users.Email = req.body.Email;
    Users.Password = req.body.Password;

    // check for Already account login && Email 
    const EmailAlreadyFind = await Login.findOne({ Email: req.body.Email })
    console.log("Email Find database :", EmailAlreadyFind)

    try {
        // check Email is already exist error shows && Email is not found (not find) && Email=== Null
        if (EmailAlreadyFind.Email) {
            res.send('already account created').status(200)
            console.log('email already exist')
        }
    } catch (error) {
        console.log("pendding")
        const UsersData = await Users.save();
        console.log(`UsersData req-body ` + UsersData);
        res.json(UsersData)
    }
    /// next js req

})

// //// //// Simple signUp and Login    === End



//// //// Encrepted data for signUp time

const CryptoJS = require("crypto-js");


// /// create time you signup time Encrypt password send database in Encrypt    
app.post('/signup/encrypt-js', async (req, res) => {
    // schema 
    const Users = new Login();   // schema Login.js line:7 
    Users.Fname = req.body.Fname;
    Users.Email = req.body.Email;

    ////// Encrypt Password 
    const EncryptPassword = CryptoJS.AES.encrypt(req.body.Password, 'secret key : vishal').toString();

    Users.Password = EncryptPassword;

    // check for Already account login && Email 
    const EmailAlreadyFind = await Login.findOne({ Email: req.body.Email })

    try {
        // check Email is already exist error shows && Email is not found (not find) && Email=== Null
        if (EmailAlreadyFind.Email) {
            res.send('already account created').status(200)
            console.log('email already exist')
        }
    } catch (error) {

        // // save database
        console.log("pendding + create save database info")
        const UsersData = await Users.save();
        console.log(`UsersData req-body ` + UsersData);
        res.json(UsersData)
    }
})


// /// login time Decrypt password that password can check 
app.post('/login/decrypt-js', async (req, res) => {
    const Users = new Login();   // schema Login.js line:7 
    Users.Email = req.body.Email;

    ////// EncryptPassword this Email Password
    const EmailFind = await Login.findOne({ Email: req.body.Email })

    /////// DecryptPassword

    if (EmailFind != null) {

        const DecryptPassword = CryptoJS.AES.decrypt(EmailFind.Password, 'secret key : vishal').toString(CryptoJS.enc.Utf8)
        try {
            if (req.body.Password === DecryptPassword) {
                console.log('your password is correct')
                res.send('your password is correct')
            } else {
                console.log("password invalid")
                res.send('Password invalid')
            }
        } catch (error) {
            console.error(error + "400")
            console.log("Invalid Email & Password")
            res.send("Invalid Email & Password")
        }

    } else {

        console.log("Email is Invalid ")
        res.send("Email is Invalid ")


    }







})








// routes
app.get('/', (req, res) => {
    res.send('running server')


})

app.listen(8080, () => { console.log('localhost:8080') })