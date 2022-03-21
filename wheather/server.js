var http = require('http');
const {log} = require("./log");
const { connection } = require("./db/connection")
const app = require("express")()
const serveStatic = require("serve-static")
const cors = require("cors")
const bodyParser = require("body-parser");
const {v1} = require('./Router/v1/v1');
app.use(cors())
app.use(require("express").json());//enable JSON middleware for requests
app.use(bodyParser.urlencoded({ extended: true }))//parse urlencoded request bodies
connection().then((good) => {

  app.use("/api", v1)

  app.use("/*", (req,res)=>{res.status(404).send("Nothing here")})

}).catch((bad) => {
  if (bad.status!==undefined) {
    log("/logs/db/connection/", { on: "/index.js - 18", error: JSON.stringify(bad) })
  } else {
    log("/logs/db/connection/", { on: "/index.js - 20", error: bad.toString() })
    
  }

})
// middleware
app.listen(5000,() => {
  console.log(`Running on port: 5000`);
})           
