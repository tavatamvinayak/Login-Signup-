// /// schema 
const Users = require('../model/users')

// // CryptoJS
const CryptoJS = require("crypto-js");


/// // create a user
const signup = async (req, res) => {

    const CreateUsers = new Users();
    const { Fname, Email, Password } = req.body;

    CreateUsers.Fname = Fname;
    CreateUsers.Email = Email;



    ////// Encrypt Password 
    const EncryptPassword = CryptoJS.AES.encrypt(Password, 'secret key : vishal').toString();
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
            res.json({ userAlreadyCreatedFind:true, USER_IS_ALREADY_EXISTED: userAlreadyCreatedFind.Email}).status(400);
        }
    } catch (error) {
        console.log("invalid Account ")
        res.send("invalid Account ").status(400)
    }

}

module.exports = signup