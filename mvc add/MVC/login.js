const Users = require('../model/users');

// // CryptoJS
const CryptoJS = require("crypto-js");


/// /// Jwt token send a user 
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {

    const Login = new Users();
    const { Email, Password } = req.body;
    Login.Email = Email;
    Login.Password = Password;
    const userAreadyExist = await Users.findOne({ Email: Email });


    /////// /// DecryptPassword
    const DecryptPassword = CryptoJS.AES.decrypt(userAreadyExist.Password, 'secret key : vishal').toString(CryptoJS.enc.Utf8)

    try {
        if (Password === DecryptPassword) {
            console.log("login successfuly")
            // res.send(`user Login successfuly ${userAreadyExist} `)

            // /// token
            const token = jwt.sign({ id : userAreadyExist._id  , Fname:userAreadyExist.Fname , Email:Email }, 'jsonWebToken');
            console.log(token)
            res.status(201).json({ Password:true,Success: true, token:token })

        } else {
            console.log("passsword invalid")
            res.json({Password:false}).status(401);
        }
    } catch (error) {
        console.log(" email Account not created")
        res.send("invalid account , account not found").status()
    }

}

module.exports = Login