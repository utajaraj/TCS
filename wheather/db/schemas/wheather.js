const mongoose = require("mongoose")

const WeatherSchema = new mongoose.Schema({
    
        coord: {
            type:{},
            required:true
        },
        weather: {
            type:[],
            required:true
        },
        main: {
            type:{},
            required:true
        },
        visibility: {
            type:Number,
            required:true
        },
        wind: {
            type:{},
            required:true
        },
        clouds:{
            type:{},
            required:true
        },
        sys: {
            type:{},
            required:true
        },
        timezone:{
            type:Number,
            required:true
        },
        id: {
            type:Number,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        cod: {
            type:Number,
            required:true
        },
},{
    timestamps: true
  })

const WeatherModel =  new mongoose.model("Weather",WeatherSchema)

module.exports={
    WeatherModel:WeatherModel
}