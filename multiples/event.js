const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter()


// event that is emitted when the process if called from cli
myEmitter.on('event', async (number, secondNumber) => {

    try {

        // calculation to ultimately be returned
        let result = 0

        // grab numbers into array var to loop through
        let numbers = [number, secondNumber]


        // for each number provided
        for (let index = 0; index < numbers.length; index++) {

            // where element is the number
            const element = numbers[index];

            // place to store the multiple found up the number multiple by increasing one unit starting at 1
            let multiples = []

            // place to store the result of the sum of the previous iteration multipled by the integer increasing by one unit
            let multiplied = 0

            // integer to increase by one unit to multiply number
            let integer = 1

            // while the number at iteration multiple by the unit is less than one thousand as instructed
            while (element * integer <= 1000) {

                // store the result of the sum of the previous iteration multipled by the integer increasing by one unit
                multiplied = (element * integer) + multiplied

                // ṗush the multiple that was just added to the array of multiple to be return later
                multiples.push(element*integer)

                // increase integer by one unit
                integer++

            }

            // once iteration to find multiple and sum them is done with the while loop emit an event that will log the multiple to the console for information
            myEmitter.emit("multiples",`Multples of ${element} are: ${multiples}`)

            // sum the result of the multiple to the final result outside of the for scope
            result = result + multiplied

        }


        // remit an event to log result to console after two second as instructed
        setTimeout(() => {

            myEmitter.emit("result",result)

        }, 2000);
    } catch (error) {

        console.log(error)
        
    }


})

module.exports = {
    myEmitter: myEmitter
}
