import express from "express";
import mongoose from "mongoose";
import doctordata from "./src/models/Doctor.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = 5000;



const mongoconnect = async ()=>{
    const connextion = await mongoose.connect(process.env.MONGO_URI);
    if(connextion){
        console.log("MpngoDB connect Succesfullly")
    }
}

mongoconnect()



app.get("/doctor" , async(req,res)=>{

    const doc = await doctordata.find();
    res.json({
        success : "true",
        doctor : doc,
        message : "Succesfully Fetch Data."
    })
})

app.post('/doctors' , async (req,res)=>{
    const {name,age,number,degree} = req.body;

    if (!name || !age || !number || !degree) {
        return res.json({
            success: false,
            message: "All fields are required",
        });
    }
     
    const newDoctor = new doctordata ({
        name,
        age,
        number,
        degree
    })

    const savedDoctor = await newDoctor.save();

    res.json({
        success : "true",
        doctor : savedDoctor,
        message : "Succesfully Fetch Data."
    })
})

app.get("/specificdoctor" , async(req,res)=>{
    const {name} = req.query;

  const Doct = await doctordata.findOne({name:name});

  res.json({
    success : "true",
    doctor : Doct,
    message : "Succesfully Fetch Data."
  })

})
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})