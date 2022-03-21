const { myEmitter } = require("./event");

// get the absolute valude of the first command argument
const number = Math.abs(Number(process.argv[2]))

// get the absolute valude of the first command argument
const secondNumber = Math.abs(Number(process.argv[3]))


function logInfo(result){
    console.log(result)
}

// event is emitted by event.js when the all the multiple multiplied by the increasing unit integer is done
// it contains the summed multiples
myEmitter.on('multiples', (result) => {
    logInfo(result)
})


// event is emitted by event.js when the calculation is done
// it contains the final result
myEmitter.on('result', (result) => {
    logInfo(result)
})


// validate that the parameter provided in the command are in fact integers
if (Number.isInteger(number)&&Number.isInteger(secondNumber)) {

    // emit event that call the function that calculates the result and multiples to then emit event back to this file
    myEmitter.emit('event',number,secondNumber)

} else {

    // communicate error to console
    console.log("Please provide only integers")

    return 

}


