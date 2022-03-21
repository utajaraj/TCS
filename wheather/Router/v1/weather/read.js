const { WeatherModel } = require("../../../db/schemas/wheather")
const { log } = require("../../../log")
const ReadWeatherRouter = require("express").Router()
require("dotenv").config()
const getFromAPI = (city) => {

    return new Promise((resolve, reject) => {

        // Get weather infromation from API
        require("axios").get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.APIKEY}`).then(function (response) {


            resolve(response)


        })
            .catch(function (error) {

                // check if error thrown was due to code
                if (error.response == undefined) {

                    reject(error)

                } else {

                    // check if the error throw was a thrown by the API call
                    reject(`City: ${city} doesn't exist or cannot be found`)

                }


            })
    })
}
// capture request that have 
ReadWeatherRouter.get("/city/*", (req, res) => {

    // validate url
    if (req.path.split("/").length !== 3) {

        res.status(300).send({ error: "Invalid Request", message: "Please abide by the following request structure /api/v1/weather/city/<city name>" })

        return

    }

    // get city name from url path
    let city = req.path.split("/")[req.path.split("/").length - 1]

    // use city name to look for weather info in the database
    WeatherModel.findOne({ name: city }, (err, result) => {



        // if there is no wheather information for the provided name in DB
        if (result == null) {

            getFromAPI(city).then((response) => {

                response.data.name = city

                // create weather object to store
                const newWeatherEntry = new WeatherModel(response.data)

                // store weather information in DB
                newWeatherEntry.save((err, result) => {

                    // send error
                    if (err) {
                        res.status(500).send("Error")
                        return
                    }

                    // if information was saved successfully
                    res.status(200).send(result)
                })

            }).catch((error) => {

                // store error in logs for later debugging
                log("/logs/weather", { on: "/Router/v1/weather/read.js - 61", error: error.toString() })
                res.status(400).send(error)

            })


        } else { // if the provided city already has weather information in the DB

            // check if the information in the database is newer than 20 seconds
            if ((new Date() - new Date(result.updatedAt)) < 20000) {

                res.status(200).send(result)

            } else {

                getFromAPI(city).then((response) => {

                    // change API name for user provided city name 
                    response.data.name = city

                    // update information on DB with recent information
                    WeatherModel.updateOne({ name: city }, response.data, (err, result) => {

                        // error while updating
                        if (err) {

                            res.status(500).send("Error, please try again later")

                            return

                        }

                        // return data from API
                        res.status(200).send(response.data)

                    })

                }).catch((error) => {

                    // store error in logs for later debugging
                    log("/logs/weather", { on: "/Router/v1/weather/read.js - 61", error: error.toString() })
                    res.status(400).send(error)

                })




            }


        }


    })




})

module.exports = {
    ReadWeatherRouter: ReadWeatherRouter,
    getFromAPI:getFromAPI
}
