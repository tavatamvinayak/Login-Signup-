const mongoose = require('mongoose');

const { Schema } = mongoose;

const Users = new Schema({
    Fname : String ,
    Email :  {
        type:String,
        require: true,
        unique: true
    },
    Password : {
        type:String,
        require: true,
    }
})

const Signup = mongoose.model('Users' , Users);
module.exports = Signup
