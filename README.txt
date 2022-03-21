THIS REPOSITORY DOES NOT CONTAIN A .gitignore FILE, SO DO BEHAVE AS NEED WHEN PUSHING DATA TO IT

This repository contain multiple folder. With in each folder is each application.

To run each a application navigate to the application folder and install dependencies using npm:

"npm install"

The "users" and "weather" application can be run with the command "node server.js"

The "weather application requires a specific folder structure to store error logs. Please read the "/weather/README.txt" file

To run the "servers" application run "node findServer.js" this file contain a function that attempts to find live servers using two methods, one is by pinging and one is using request.

To run the "multiples" application you need to run the command "node events.js" but this command requires two argument please read the "/multiples/README.txt" file.

Each repository contains some unit test, to run these you need to execute the command "mocha <folder name>.test.js". This command need to be run within each application folder, or if not the path needs to be adjusted as well as the node modules installation.

