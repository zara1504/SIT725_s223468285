const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/cowsDB");

const ProjectSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});

const Project = mongoose.model("Project", ProjectSchema);

const sampleData = [
  {
    title: "Highland Cow",
    image: "Images/m1.png",
    description:
      "This is a highland cow with horns!",
  },
  {
    title: "Small Cow",
    image: "Images/m2.png",
    description:
      "This is a smaller highland cow!",
  },
  {
    title: "Baby cow and Mum Cow",
    image: "Images/m5.png",
    description: "This is a photo of a baby and mother cow!",
  },
];

Project.insertMany(sampleData)
  .then(() => {
    console.log("Sample data inserted");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Seed error:", err);
    mongoose.connection.close();
  });