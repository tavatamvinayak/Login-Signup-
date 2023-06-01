const mongoose = require('mongoose');

const { Schema } = mongoose;

const Users = new Schema({
    Fname : {
        type:String,
        required: true,
    },
    Email : {
        type:String,
        required: true,
        unique: true
    },
    Password : {
        type:String,
        required: true,
    }
})

const Signup = mongoose.model('Users' , Users);
module.exports = Signup