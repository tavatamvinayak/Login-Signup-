require("dotenv").config();



// /// schema 
const Users = require('../model/users')

// // CryptoJS
const CryptoJS = require("crypto-js");

// // express validation 
const { body ,  validationResult  } = require("express-validator");

const SIGNUP_ExpressValidation = [
    body('Fname' , 'Enter a valid Full Name').isLength({min:5}),
    body('Email' , 'Enter a valid Email').isEmail(),
    body('Password' , 'Password must be atleast 8 character').isLength({min:8}),
]


/// // create a user
const signup = async (req, res) => {

    // express validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }


    // // / create a new user in data base 
    const CreateUsers = new Users();
    const { Fname, Email, Password } = req.body;

    CreateUsers.Fname = Fname;
    CreateUsers.Email = Email;



    ////// Encrypt Password 
    const EncryptPassword = CryptoJS.AES.encrypt(Password, process.env.ENCRYPT_DECRYPT_PASSWORD).toString();
    CreateUsers.Password = EncryptPassword


    console.log(CreateUsers.Password)
    // check for Already account login && Email 
    const userAlreadyCreatedFind = await Users.findOne({ Email: Email });

    try {
        if (!userAlreadyCreatedFind) {
            console.log("data save processing to db ");
            const SaveUser = await CreateUsers.save();
            res.json({ userAlreadyCreatedFind:false ,Saved:SaveUser}).status(201);
            console.log(SaveUser)
        } else {
            console.log("user is exist " + userAlreadyCreatedFind);
            res.json({ userAlreadyCreatedFind:true , USER_IS_ALREADY_EXISTED: userAlreadyCreatedFind.Email}).status(400);
        }
    } catch (error) {
        console.log("invalid Account ")
        res.json({error:"invalid Account"}).status(400)
    }

}

module.exports = {signup , SIGNUP_ExpressValidation }