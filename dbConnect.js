const mongoose = require('mongoose')

const dbConnect = async()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/form').then(() => {
        console.log('connect database successfuly')
    }).catch((err) => {
        console.error(err)
    });
}

module.exports = dbConnect;