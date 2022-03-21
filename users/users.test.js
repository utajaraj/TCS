var chai = require('chai'),
    expect = chai.expect;
const should = require("should")
const axios = require("axios")

describe("Users API", function () {


    describe("Get users", function () {


        it("Get all users", async () => {

            const {data} = await axios.get("http://localhost:5000/api/v1/users/view")
            expect(data).to.be.an('array')
            expect(Object.keys(data[0])).to.contain("email")
            expect(Object.keys(data[0])).to.contain("name")


        })

        it("Get user by wrong id", async () => {

            const {data} = await axios.get("http://localhost:5000/api/v1/users/view?id=965165312354124684641216564165465135165159616564165")
            expect(data.message).to.equal("User not found")

        })

        it("Get user by invalid id data type", async () => {

                try {
                    const result = await axios.get("http://localhost:5000/api/v1/users/view?id=93541BC-651ADE651")
                } catch (error) {
                    expect(error.response.data.message).to.equal("Please provide a valid id")
                }

        })

    })

})