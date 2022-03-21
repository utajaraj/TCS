const { WeatherRouter } = require("./weather/Weather")

const v1 = require("express").Router()

v1.use("/v1",[WeatherRouter])

module.exports={
    v1:v1
}