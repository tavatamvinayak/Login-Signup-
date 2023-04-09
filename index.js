const express = require('express')
const dbConnect  = require('./dbConnect')
const cors = require('cors')
const bodyParser = require('body-parser')

// schema  
const Login = require('./schema/Login')


dbConnect();// database connect 
const app = express()

app.use(cors())
app.use(express.json())

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));
 
// Parses the text as json
app.use(bodyParser.json());

 


app.post('/',async(req,res)=>{

   
    // schema 
    const Users = new Login();
    Users.Fname = req.body.Fname;
    Users.Email = req.body.Email;
    Users.Password = req.body.Password;

    const UsersData = await Users.save();
    console.log(  UsersData)
    
   
    // res.json(UsersData)


    // data base send a data in login data
        /// insert data
       
        const createData  = await Login.create(UsersData)

        res.json(createData).status(200)

        
        


    /// next js req

})


// delete data






// routes
app.get('/' ,(req,res)=>{
    res.send('running server')
    
   
})

app.listen(8080,()=>{console.log('localhost:8080')})