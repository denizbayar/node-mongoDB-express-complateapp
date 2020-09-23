const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');

//Config .env
dotenv.config();

//Connect to DB
mongoose.connect(
process.env.DB_CONNECT, 
{ useUnifiedTopology: true , useNewUrlParser:true },
()=>console.log('DB Connected.'))

//Check DB Error in case
const db = mongoose.connection;
db.on('error', console.error.bind(console,'MongoDB connection error.'))

//Apply Json Middleware
app.use(express.json())

//User routes
app.use('/api/user', authRouter);
app.use('/api/posts', postRouter);

//Listen to server on port 3000
app.listen(3000, ()=>console.log("Port 3000 is listening."))

//Verifiy app works
app.get('/', (req,res)=>{
    res.status(200).send("Successfully connect !")
})