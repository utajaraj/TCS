const mongoose = require("mongoose")

require("dotenv").config()

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
    useNewUrlParser: true,
    useUnifiedTopology: true 
  };

  const connection = ()=>{

      return new Promise((resolve,reject)=>{

          mongoose.connect(process.env.MONGOURI, options, function(err) {
              err?reject({status:false, message:"Connection to database failed", data:err}):resolve({status:true, message:"Connection to database successful", data:null})
          });
          
      })

  }
  
  module.exports={
      connection: connection
  }
