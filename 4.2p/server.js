const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.port || 3001;

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/cowsDB");

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});

const Project = mongoose.model("Project", ProjectSchema);

app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find({});

    res.json({
      statusCode: 200,
      data: projects,
      message: "Success",
    });
  } catch (error) {
    console.error("API ERROR:", error);

    res.status(500).json({
      statusCode: 500,
      message: "Server Error",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});