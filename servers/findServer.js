// validate structure of servers parameters
const validStructure = (body) => {

    let valid = true

    // array to check for repeated priorities
    let priorites = []


    body.forEach(item => {

        // check if priority is set in order to see if its repeated
        if (item.priority !== undefined) {

            // if priority is repeated
            if (priorites.includes(item.priority)) {

                valid = false

            }

            priorites.push(item.priority)

        }

        // check if both url and priority properties are set
        if (item.url == undefined || item.priority == undefined) {
            valid = false
        }


        // check if url is a valid domain
        if (item.url !== undefined && !/^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\.[a-zA-Z]{2,3})$/.test(item.url)) {

            valid = false
        }

        // check if the user is sending more the 10 server items
        if (body.length > 10) {

            valid = false

        }

    })
    return valid
}


// ping server to check if they're alive
const lookToSeeIfServersAreOnlineByPing = (servers) => {

    return new Promise((resolve, reject) => {

        // spawn child process
        const exec = require('child_process').exec

        // to count the number of processes that have resolved
        let done = 0

        const results = []


        servers.forEach((server, iteration) => {

            // ping server by url
            exec(`ping -c 1 ${server.url}`, (err, stdout, stderr) => {

                // if the process has a standard output 
                if (stdout.length !== 0) {

                    // push a server information to results because it's alive
                    results.push(`${servers[iteration].priority}- ${servers[iteration].url}`)

                }

                // up the counter to reflect process is done
                done++

                // if the number of done processes is equal to the number of requested server checks
                if (done == servers.length) {

                    resolve(results.sort())

                }


            })
        })

    })

}


// send request to server to see if they're alive
const lookToSeeIfServersAreOnlineByHTTP = (servers) => {

    const http = require("http")

    const results = []

    // to count the number of processes that have resolved
    let done = 0

    return new Promise((resolve, reject) => {


        servers.forEach((server, iteration) => {

            http.get({
                hostname: `${servers[iteration].url}`,
                timeout: 5000
            }, (response) => {

                // check if the status code return is with in the 200 range
                if (response.statusCode >= 200 && response.statusCode <= 299) {

                    // push a server information to results because it's alive
                    results.push(`${servers[iteration].priority}- ${servers[iteration].url}`)

                }

                // up the counter to reflect process is done
                done++

                

                // if the number of done processes is equal to the number of requested server checks
                if (done == servers.length) {

                    resolve(results.sort())

                }



            }).on("error", () => {

            })

        })


    })

}


const findServer = (servers, method) => {

    return new Promise((resolve, reject) => {

        // if the call doesn't have both parameters reject the request
        if (servers == undefined || method == undefined) {

            reject("Missing required parameter(s)")

            return

        }


        // validate request body structure
        if (validStructure(servers)) {

            // check desired method for determining alive server
            if (method == "ping") {

                lookToSeeIfServersAreOnlineByPing(servers).then((data) => {


                    if (data.length) {

                        resolve(data[0])

                    } else {

                        reject("All servers are offline")

                    }


                }).catch((err) => {

                    reject(`Error on request: ${err.toString()}`)

                })

            } else if (method == "HTTP") {

                lookToSeeIfServersAreOnlineByHTTP(servers).then((data) => {


                    if (data.length) {

                        resolve(data[0])

                    } else {

                        reject("All servers are offline")

                    }


                }).catch((err) => {

                    reject(`Error on request: ${err.toString()}`)

                })

            } else {

            //    if the method parameter passed is not either HTTP or ping 
                reject(`The method: ${method} is not recognized please use one of the two following methods: \"ping\", \"HTTP\"`)
            }

        } else {

            // if the structure validation failed
            reject("Please provide a valid structure")

        }

    })

}

module.exports = {
    findServer: findServer
}