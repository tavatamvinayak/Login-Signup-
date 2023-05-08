require("dotenv").config();

const mongoose = require('mongoose')

const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/form'
const dbConnect = async()=>{
    mongoose.connect(mongoUrl).then(() => {
        console.log('connect database successfuly')
    }).catch((err) => {
        console.error(err)
    });
}

module.exports = dbConnect;