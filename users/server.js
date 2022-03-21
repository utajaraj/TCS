
const express = require("express")
const {Routes} = require("./Router/Router")
const app = express()
app.use(express.json())//enable JSON middleware for requests
app.use(require("body-parser").urlencoded({extended:true}))//parse urlencoded request bodies
app.use("/",[Routes])
app.get("*",(req,res)=>{
  res.json({message:"nothing"})
})

app.listen(5000,()=>{
    console.log("Runnning")
})