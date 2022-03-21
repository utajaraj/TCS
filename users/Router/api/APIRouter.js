const {V1Router} = require("./v1/V1Router")

const APIRouter = require("express").Router()

APIRouter.use("/api",[V1Router])

module.exports={
    APIRouter:APIRouter
}