const { ReadWeatherRouter } = require("./read")

const WeatherRouter = require("express").Router()

WeatherRouter.use("/weather",[ReadWeatherRouter])

module.exports={
    WeatherRouter:WeatherRouter
}