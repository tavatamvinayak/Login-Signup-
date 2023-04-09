const mongoose = require('mongoose')

const {Schema} = mongoose;

const SignupUsers = new Schema({
    
    Email : String,
    Password : String
})

const Signup =  mongoose.model('Signup' , SignupUsers)
module.exports =Signup;
