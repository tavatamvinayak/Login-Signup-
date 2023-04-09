const mongoose = require('mongoose')
const {Schema} = mongoose;

const LoginUsers = new Schema({
    Fname : String,
    Email : String,
    Password : String,
})
const Login = mongoose.model('Login' , LoginUsers)

module.exports = Login