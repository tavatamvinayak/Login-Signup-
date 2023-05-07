const mongoose = require('mongoose')

const dbConnect = async()=>{
    mongoose.connect('mongodb+srv://tavatamvinayak:Minakshi@cluster0.taouj4t.mongodb.net/form?retryWrites=true&w=majority').then(() => {
        console.log('connect database successfuly')
    }).catch((err) => {
        console.error(err)
    });
}

module.exports = dbConnect;