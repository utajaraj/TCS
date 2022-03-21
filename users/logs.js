const { writeFileSync, existsSync } = require("fs")
const log = (path, data) => {
    let date = new Date()
    data["datetime"] = date
    let filePath = `${__dirname}${path}/${date.toDateString().replaceAll(" ","-")}.json`
    let dailyLogFile = existsSync(filePath)
    if (dailyLogFile) {
        const errors = require(filePath)
        errors.push(data)
        writeFileSync(filePath, JSON.stringify(errors))
        return null
    }
    writeFileSync(filePath, JSON.stringify([data]))
}
module.exports = {
    log: log
}