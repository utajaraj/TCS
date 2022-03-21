const { writeFile } = require("fs")
const { Gender, OneToOneHundred, Alphabetical, Email } = require("../../../../utils/regex")
const { executeValidation } = require("../../../../utils/validation")

const AddUsers = require("express").Router()

AddUsers.post("/add", (req, res) => {

    const valid = executeValidation(req.body, {
        "name": {
            dataType: Alphabetical,
            invalidMessage: "Name is not valid",
            missingMessage: "Name is required"
        },
        "email": {
            dataType: Email,
            invalidMessage: "Email is not valid",
            missingMessage: "Email is required"
        },
    }, {
        "age": {
            dataType: OneToOneHundred,
            invalidMessage: "Age must be from 0 to 100",
        },
        "gender": {
            dataType: Gender,
            invalidMessage: "gender must only contain (male||female)",
        },
    })

    if (valid.status) {
        const users = require(__dirname+"/../../../../data/users.json")
        let userID = (new Date()).getTime()
        let exists = false
        users.forEach(user => {
            if (Number(user["id"])==userID||user["email"]==req.body.email) {
                exists=true
            }
        })
        if (!exists) {
            req.body.id=userID
            users.push(req.body)
            writeFile(__dirname+"/../../../../data/users.json",JSON.stringify(users),(err)=>{
                if (err) {
                    res.status(400).send({message:"Could not add user"})
                } else {
                    res.status(200).send(req.body)
                }
            })
        }else{
            res.status(400).send({message:"Email is already being used by another user"})
        }
    } else {
        res.status(400).send(valid.data)
    }

})

module.exports = {
    AddUsers: AddUsers
}