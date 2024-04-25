const express=require('express');
const cors=require('cors')
const mongoose=require('mongoose');
const userRoute=require('./routes/UserRoute')
const app=express();

app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/netflix').then(()=>console.log("db connected"))

app.use('/api/user',userRoute)
app.listen(5000,console.log('server'))