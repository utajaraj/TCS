const {APIRouter} = require("./api/APIRouter")

const Routes = require("express").Router()

Routes.use("/",[APIRouter])

module.exports={
    Routes:Routes
}