import express from "express";

const app = express();
app.use(express.json());
const PORT = 5000;

const doctors = [];

app.get("/doctor" , (req,res)=>{
    res.json({
        success : "true",
        doctor : doctors ,
        message : "Succesfully Fetch Data."
    })
})

app.post('/doctors' , (req,res)=>{
    const {name,age,number,degree} = req.body;

    if(!name){
        return res.json(
            {
                message : "name is required",
                cause : "error"
            }
        )
      }
      if(!age){
        return res.json(
            {
                message : "age is required",
                cause : "error"
            }
        )
      }
      if(!number){
        return res.json(
            {
                message : "number is required",
                cause : "error"
            }
        )
      }
      if(!degree){
        return res.json(
            {
                message : "degree is required",
                cause : "warranty"
            }
        )
      }
     
    const id = Math.floor(Math.random()*100)+1;

    const obj = {
        name,
        age,
        number,
        degree,
        id
    }
    doctors.push(obj);

    res.json({
        success : "true",
        doctor : doctors ,
        message : "Succesfully Fetch Data."
    })
})

app.get("/specificdoctor" , (req,res)=>{
    const {id} = req.query;

  let doct = null;
  
  doctors.forEach((docto)=>{
    if(docto.id==id){
        doct=docto;
    }
  })

  if(doct==null){
    return res.json(
        {
            message : "deatail not found",
        }
    )
  }

  res.json({
    success : "true",
    doctor : doct ,
    message : "Succesfully Fetch Data."
  })

})
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})