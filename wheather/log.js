const { writeFileSync, existsSync } = require("fs")
const log = (path, data) => {
    let date = new Date()
    data["datetime"] = date

    // get path to los directory
    let filePath = `${__dirname}${path}/${date.toDateString().replaceAll(" ","-")}.json`
    let dailyLogFile = existsSync(filePath)

    // check if the file exits

    // if the file exists
    if (dailyLogFile) {
        // require the data from the existing file
        const errors = require(filePath)

        // push the new error to the log data from previous file
        errors.push(data)

        // write file to the same location
        writeFileSync(filePath, JSON.stringify(errors))

        // return funtion to prevent from continuing to the writeFIleSync function
        return null
    }

    // if the file doesn't exist simply create it
    writeFileSync(filePath, JSON.stringify([data]))
}
module.exports = {
    log: log
}