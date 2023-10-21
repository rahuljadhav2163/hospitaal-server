import { Schema , model } from "mongoose";

const docSchema = new Schema({
    name: String,
    age: String,
    degree: String,
    number: String
  })
  
  const doctordata = model ('doctordata',docSchema);
  export default doctordata;