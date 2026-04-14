const expect = require("chai").expect;
const request = require("request");
const { calculateAvgLapTime } = require("../server");

// Test about race results and API.
//test 1 is valid 
describe("F1 Race Results API", function () {
  const baseUrl = "http://localhost:3001";
  it("returns status 200 to check if API works", function (done) {
    request(baseUrl, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  //test 2 is valid
  it("should return all race results as an array", function (done) {
    request.get(`${baseUrl}/results`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      const data = JSON.parse(body);
      expect(data).to.be.an("array");
      expect(data.length).to.be.greaterThan(0);
      done();
    });
  });

  //test 3 is a edgecase 
  it("should return the correct race when searched by name", function (done) {
    request.get(`${baseUrl}/results/Monaco%20GP`, function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      const data = JSON.parse(body);
      expect(data.driver).to.equal("Lewis Hamilton");
      done();
    });
  });

  //test 4 is invalid
  it("should return 404 for a race that does not exist", function (done) {
    request.get(`${baseUrl}/results/Fake%20GP`, function (error, response, body) {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});

// Tests about the lap times in a GP race. 
//test 5 is valid 
describe("Average Lap Time Calculator", function () {
  it("should return correct average lap time for valid inputs", function () {
    const result = calculateAvgLapTime(5263, 44);
    expect(result).to.equal(119.61);
  });

  //test 6 is invalid
  it("should return null when laps is zero", function () {
    const result = calculateAvgLapTime(5263, 0);
    expect(result).to.be.null;
  });

  //test 7 is a edgecase 
  it("should return null for non-numeric inputs", function () {
    const result = calculateAvgLapTime("fast", "many");
    expect(result).to.be.null;
  });
});