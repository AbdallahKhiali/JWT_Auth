const express = require('express');
const  Connection  = require('./db');
const router = require('./routers/user.router');
const app = express();
var cors = require('cors')
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
// const session = require('express-session')
// var MongoDBStore = require('connect-mongodb-session')(session);

const secret_key = 'skilled'

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser());

Connection();


// var store = new MongoDBStore({
//   uri: 'mongodb://localhost:27017/mern_one',
//   collection: 'Sessions'
// });


// app.use(session({
//     secret: secret_key,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24 * 7 * 4 , // 4 week  
//         secure: true 
//     },
//     store:store,
//   }))

app.use('',router)

app.listen(3001,()=>console.log('server working on port 3001'))

