// In this activity we will update a test file designed for the Project 2 Starter to work with our own project repos.

// Instructions
// Copy example.post.test.js over to the test folder in your local project repo. Rename this file to be to match the name of the api you're testing, e.g. todo.post.test.js or recipes.post.test.js.
// Update the test endpoint to be one in your own project. The endpoint should use data submitted on req.body to create a new instance of a model.
// Update reqBody to match what is expected by your model's schema.
// Update the final assertion to expect an object matching the one sent to the endpoint.
// Run the tests by running npm run test and make sure everything passes.
// Hints
// The Project 2 Starter repo included all the necessary dependencies and scripts in the package.json for this activity. If you get an error about missing dependencies, double check it wasn't removed beforehand.
// Ask an Instructor or TA for help if you get stuck!


var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("POST /api/examples", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should save an example", function(done) {
    // Create an object to send to the endpoint
    var reqBody = {
      text: "Example text",
      description: "Example description"
    };

    // POST the request body to the server
    request
      .post("/api/examples")
      .send(reqBody)
      .end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("object")
          .that.includes(reqBody);

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});
