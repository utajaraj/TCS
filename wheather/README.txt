Install mongodb

To open the mongo cli use the command "mongo"

In the mongo CLI  create a user with the following commands
"use admin"
"db.createUser({user:"user",pwd:"user",roles:[{role:"readWriteAnyDatabase",db:"admin"}]})"

Create a .env file on the root path of this folder that is a brother of this REAMME file

Paste the following text into the .env file
MONGOURI=mongodb://user:user@localhost:27017/?authSource=admin&authMechanism=SCRAM-SHA-256&readPreference=primary&appname=ARMS%20AUTH&directConnection=true&ssl=false
APIKEY=13c3f4dc2d0727b35205e11e7624b4cc

Run the following command to create the folder structure "mkdir logs;cd logs; mkdir db weather;cd db;mkdir connection"

Run NPM Install

Run "node server.js"
