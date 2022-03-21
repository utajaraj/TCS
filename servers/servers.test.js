var { expect } = require("chai")

const { findServer } = require("./findServer.js")

describe("Find servers", function () {


    describe("Find by ping", function () {


        it("Failed because of repeated priority", () => {

            findServer([{ url: "google.com", priority: 0 }, { url: "google.com", priority: 0 }], "ping").catch((err) => {

                expect(err).to.equal("Please provide a valid structure");
            })

        })

        it("Failed because of invalid domain", () => {

            findServer([{ url: "google.com", priority: 0 }, { url: "googlasdasd1@e.com", priority: 1 }], "ping").catch((err) => {

                expect(err).to.equal("Please provide a valid structure");
            })

        })


        it("Return lowest priority server", () => {

            findServer([{ url: "google.com", priority: 0 }, { url: "facebook.com", priority: 1 }], "ping").then(()=>{

                expect(err).to.equal("1- facebook.com");
            })

        })

        it("Return lowest priority server with negative int priority", () => {

            findServer([{ url: "google.com", priority: -10 }, { url: "facebook.com", priority: -1 }], "ping").then(()=>{

                expect(err).to.equal("-10- google.com");

            })

        })

    })

})