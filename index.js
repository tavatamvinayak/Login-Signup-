const express = require('express')
const dbConnect = require('./dbConnect')
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



// login user already exist then he has login
app.post('/login', async (req, res) => {

    const Users = new Login();
    Users.Email = req.body.Email;
    Users.Password = req.body.Password;

    const loginUserFind = await Login.findOne({Email:req.body.Email})

    try {
        if(loginUserFind.Password === req.body.Password){
        res.send("successfuly login "+`send responce file WEB PAGE`).status(200)
    }
    } catch (error) {
        console.log("invalid Account ")
        res.send("invalid Account ").status(400)
    }
    
});


// signup create account
app.post('/signup', async (req, res) => {

     // schema 
    const Users = new Login();
    Users.Fname = req.body.Fname;
    Users.Email = req.body.Email;
    Users.Password = req.body.Password;

    // check for Already account login && Email 
    const EmailAlreadyFind = await Login.findOne({ Email: req.body.Email })
    console.log("Email Find database :", EmailAlreadyFind)

    try {
        // check Email is already exist error shows && Email is not found (not find) && Email=== Null
        if (EmailAlreadyFind.Email) {
            res.send('already account created').status(200)
            console.log('email already exist')
        }
    } catch (error) {
        console.log("pendding")
        const UsersData = await Users.save();
        console.log(`UsersData req-body ` + UsersData);
        res.json(UsersData)
    }
    /// next js req

})




// delete data






// routes
app.get('/', (req, res) => {
    res.send('running server')


})

app.listen(8080, () => { console.log('localhost:8080') })