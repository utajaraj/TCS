const {UsersRouter} = require("./users/UsersRouter")

const V1Router = require("express").Router()


V1Router.use("/v1",[UsersRouter])

module.exports={
    V1Router:V1Router
}