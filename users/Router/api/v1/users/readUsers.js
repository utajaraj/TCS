const ReadUsers = require("express").Router()

ReadUsers.get("/view",(req,res)=>{
    const userID = Number(req.query.id)
    const users = require(__dirname+"/../../../../data/users.json")


    if (Number.isInteger(userID)) {
        let found = true
        users.forEach(user => {
            if (Number(user["id"])==userID) {
                found=false
                res.status(200).send(user)
            }
        })
        if (found) {
            res.status(200).send({message:"User not found"})
        }
    }else{
        if (req.query.id==undefined) {
            res.status(200).send(users)
        } else {
            res.status(400).send({message:"Please provide a valid id"})
        }
    }

})


module.exports={
    ReadUsers:ReadUsers
}