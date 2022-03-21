var { expect } = require("chai")
const { getFromAPI } = require("./Router/v1/weather/read.js")
describe("Get Weather", function () {


    describe("Weather by city name", function () {


        it("Get city from API", async () => {

            const keys = ["coord","weather","base","main","visibility","wind","clouds","dt","sys","timezone","id","name","cod"]

            const {data} = await getFromAPI("indianapolis")

            expect(Object.keys(data)).to.deep.equal(keys)

        })

        it("Get unknown city from API", async () => {

            const city = "ontaksrnfrio"
            
            try {
                await getFromAPI(city)
            } catch (error) {
                expect(error).to.equal(`City: ${city} doesn't exist or cannot be found`)
            }


        })


    })

})