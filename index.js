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

    // // // 1st check method
    try {
        // check Email is already exist error shows && Email is not found (not find) && Email=== Null
        if (EmailAlreadyFind.Email) {
            res.send('Already account created --->' + EmailAlreadyFind.Email).status(200)
            console.log('email already exist')
        }
    } catch (error) {
        console.log("Processing")
            const UsersData = await Users.save();
            console.log(`UsersData req-body ` + UsersData);
        res.json(UsersData)
    }


    /// /// 2st check method 
    // if (EmailAlreadyFind === null) {
    //     const UsersData = await Users.save();
    //     res.json(UsersData)
    // } else {
    //     console.log(" Email Already have Account ")
    //     return res.json({ error: "Email Already have Account" })
    // }




    /// next js req

})

// //// //// Simple signUp and Login    === End






//// //// Encrepted data for signUp time

const CryptoJS = require("crypto-js");


// /// create time you signup time Encrypt password send database in Encrypt    
app.post('/signup/encrypt-js', async (req, res) => {
    // schema 
    const Users = new Login();   // schema Login.js line:7 
    const { Fname, Email, Password } = req.body
    Users.Fname = Fname;
    Users.Email = Email;

    ////// Encrypt Password 
    const EncryptPassword = CryptoJS.AES.encrypt(Password, 'secret key : vishal').toString();

    Users.Password = EncryptPassword;

    // check for Already account login && Email 
    const EmailAlreadyFind = await Login.findOne({ Email: Email }) // req.body.Email 

    try {
        // check Email is already exist error shows && Email is not found (not find) && Email=== Null
        if (EmailAlreadyFind) {
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
    const { Email, Password } = req.body
    Users.Email = Email;

    ////// EncryptPassword this Email Password
    const EmailFind = await Login.findOne({ Email: Email })


    /// /// 1st we check a Email is Null (Not find a Email in database) 
    if (EmailFind != null) {

        /////// /// DecryptPassword
        const DecryptPassword = CryptoJS.AES.decrypt(EmailFind.Password, 'secret key : vishal').toString(CryptoJS.enc.Utf8)

        /// /// Jwt token send a user 
        const jwt = require('jsonwebtoken');

        try {
            if (Password === DecryptPassword) {
                console.log('your password is correct')
                const token = jwt.sign({ Email: Users.Email, Fname: Users.Fname }, 'json web token');
                res.status(200).json({ Success: true, token })
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
        console.log("Email is Invalid  Email is Not Find in Database")
        res.send("Email is Invalid Email is Not Find in Database ").status(400)
    }
})








// routes
app.get('/', (req, res) => {
    res.send('running server')


})

app.listen(8080, () => { console.log('localhost:8080') })