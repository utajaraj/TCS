const { writeFile } = require("fs")
const { Gender, OneToOneHundred, Alphabetical, Email } = require("../../../../utils/regex")
const { executeValidation } = require("../../../../utils/validation")

const PatchUsers = require("express").Router()

PatchUsers.patch("/edit/:id", (req, res) => {
    let userID = Number(req.params.id)
    let validID = false
    let userDataInDB = {}
    let newDBArray = []
    if (Number.isInteger(userID)) {
        const users = require(__dirname + "/../../../../data/users.json")
        users.forEach(user => {
            if (Number(user["id"]) == Number(userID)) {
                validID = true
                userDataInDB=user
            }else{
                newDBArray.push(user)
            }

        })
    } else {
        res.status(400).send({ message: "Please provide a valid id" })
        return
    }

    if (validID) {

        const valid = executeValidation(req.body, {}, {
            "name": {
                dataType: Alphabetical,
                invalidMessage: "Name is not valid",
            },
            "email": {
                dataType: Email,
                invalidMessage: "Email is not valid",
            },
            "age": {
                dataType: OneToOneHundred,
                invalidMessage: "Age must be from 0 to 122"
            },
            "gender": {
                dataType: Gender,
                invalidMessage: "Gender must only contain (male||female)",
            },
        })

        if (valid.status) {
            let patchData = req.body
           for (const key in patchData) {
               if (userDataInDB[key]!==undefined&&key!=="id") {
                userDataInDB[key]=patchData[key]
               }
           }
           newDBArray.push(userDataInDB)
           writeFile(__dirname+"/../../../../data/users.json",JSON.stringify(newDBArray),(err)=>{
            if (err) {
                res.status(400).send({message:"Could not add user"})
            } else {
                res.status(200).send(userDataInDB)
            }
        })

        } else {
            res.status(400).send(valid.data)
        }



    } else {
        res.status(400).send({ message: "Could not find user with the provided ID" })
    }



})

module.exports = {
    PatchUsers: PatchUsers
}