const { AddUsers } = require("./addUsers")
const { PatchUsers } = require("./patchUsers")
const { ReadUsers } = require("./readUsers")

const UsersRouter = require("express").Router()

UsersRouter.use("/users",[
    ReadUsers,
    PatchUsers,
    AddUsers
])

module.exports={
    UsersRouter:UsersRouter
}