const mongoose = require('mongoose');

const { Schema } = mongoose;

const Users = new Schema({
    Fname : String ,
    Email : String,
    Password : String
})

const Signup = mongoose.model('Users' , Users);
module.exports = Signup