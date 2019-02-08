// In this activity we will update a test file designed for the Project 2 Starter to work with our own project repos.

// Instructions
// Copy example.test.js over to the test folder in your local project repo. Rename this file to be to match the name of the api you're testing, e.g. todo.test.js or recipes.test.js.
// Update the test endpoint to be one in your own project. The endpoint should return all instances of a model from the database.
// Update the bulkCreate method to use your own model name instead of Example. Update the data being passed into the bulkCreate method to match what is expected by your model's schema.
// Update the assertions to expect objects matching the ones passed into the bulk create method.
// Run the tests by running npm run test and make sure everything passes.
// Hints
// The Project 2 Starter repo included all the necessary dependencies and scripts in the package.json for this activity. If you get an error about missing dependencies, double check it wasn't removed beforehand.
// Ask an Instructor or TA for help if you get stuck!
// BONUS
// If you have a route for getting a single record of the same type by id, add a test for it!


var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/examples", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should find all examples", function(done) {
    // Add some examples to the db to test with
    db.Example.bulkCreate([
      { text: "First Example", description: "First Description" },
      { text: "Second Example", description: "Second Description" }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/examples").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({ text: "First Example", description: "First Description" });

        expect(responseBody[1])
          .to.be.an("object")
          .that.includes({ text: "Second Example", description: "Second Description" });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
