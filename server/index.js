import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js"

const app=express();
// const hostname = '192.168.1.3';

app.use(bodyParser.json({limit: "30mb" , extended : true}));
app.use(bodyParser.urlencoded({limit: "30mb" , extended : true}));
app.use(cors());

app.use("/posts",postRoutes); 
app.use("/",(req,res)=>{
    res.status(200).json({message:"success"});
})

const CONNECTION_URL = "mongodb+srv://priyanshu1101:priyanshu1101@cluster0.bhvsw.mongodb.net/SocialMedia";
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(()=> app.listen(PORT,() => {console.log(`Server running at port :${PORT}`);}))
    .catch((error)=> {console.log(error);})
