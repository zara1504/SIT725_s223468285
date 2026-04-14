var express = require("express");
const path = require("path");
var app = express();
var port = process.env.port || 3001;

app.use(express.static(path.join(__dirname, "public")));

const raceResults = [
  { race: "Australian GP", driver: "Max Verstappen", team: "Red Bull", time: "1:27:43" },
  { race: "Bahrain GP", driver: "Charles Leclerc", team: "Ferrari", time: "1:32:10" },
  { race: "Monaco GP", driver: "Lewis Hamilton", team: "Mercedes", time: "1:45:22" },
];

app.get("/results", (req, res) => {
  res.json(raceResults);
});

app.get("/results/:race", (req, res) => {
  const race = raceResults.find(
    (r) => r.race.toLowerCase() === req.params.race.toLowerCase()
  );
  if (!race) {
    return res.status(404).json({ error: "Race not found" });
  }
  res.json(race);
});

function calculateAvgLapTime(totalSeconds, laps) {
  if (laps <= 0 || isNaN(totalSeconds) || isNaN(laps)) {
    return null;
  }
  return parseFloat((totalSeconds / laps).toFixed(2));
}

app.get("/avglaptime", (req, res) => {
  const totalSeconds = parseFloat(req.query.totalSeconds);
  const laps = parseFloat(req.query.laps);

  if (isNaN(totalSeconds) || isNaN(laps) || laps <= 0) {
    return res.status(400).send("Invalid input");
  }

  const avg = calculateAvgLapTime(totalSeconds, laps);
  res.send(`Average lap time: ${avg} seconds`);
});

app.listen(port, () => {
  console.log(`F1 server is running on http://localhost:${port}`);
});

module.exports = { app, calculateAvgLapTime };