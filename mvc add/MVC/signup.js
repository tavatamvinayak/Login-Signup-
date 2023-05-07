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
            res.json(SaveUser).status(200);
            console.log(SaveUser)
        } else {
            console.log("user is exist " + userAlreadyCreatedFind);
            res.send(`user is already exist ::  ${userAlreadyCreatedFind}`);
        }
    } catch (error) {
        console.log("invalid Account ")
        res.send("invalid Account ").status(400)
    }

}

module.exports = signup