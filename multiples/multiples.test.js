var { expect } = require("chai")
const { exec } = require("child_process")

const call = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            resolve(stdout)
        })
    })
}

describe("Sum of multiples", function () {

    this.timeout(4000);

    it("Sum of two integers", async () => {

        const result = await call("node sumOfMultiples.js 100 1000")

        const sum = result.split("\n")[2]

        expect(Number(sum)).to.equal(6500)

    })


    it("Sum of two negative integers", async () => {

        const result = await call("node sumOfMultiples.js -100 -1000")

        const sum = result.split("\n")[2]

        expect(Number(sum)).to.equal(6500)

    })


})