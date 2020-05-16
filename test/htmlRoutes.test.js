var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");

var expect = chai.expect;


describe("appSanity", function() {
    it("should return index page on /", function(done) {
        // Request the route that returns all examples
        request.get("/").end(function(err, res) {
            var responseStatus = res.status;
            var responseBody = res.body;

            // Run assertions on the response

            expect(err).to.be.null;

            expect(responseStatus).to.equal(200);

            //   expect(responseBody)
            //     .to.be.an("array")
            //     .that.has.lengthOf(2);

            //   expect(responseBody[0])
            //     .to.be.an("object")
            //     .that.includes({ text: "First Example", description: "First Description" });

            //   expect(responseBody[1])
            //     .to.be.an("object")
            //     .that.includes({ text: "Second Example", description: "Second Description" });

            // The `done` function is used to end any asynchronous tests
            done();
        });
    });

});

//mocha without chai,  use: assert(app("/")).contains("some text from the index page")