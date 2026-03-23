const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const cards = [
  {
    title: "Puppy Macy",
    image: "Images/m1.png",
    description: "Hi I am Macy, this was my first photo when I got home with my new ball!"
  },
  {
    title: "Birthday Macy",
    image: "Images/m2.png",
    description: "This is me at my fourth birthday party, it was so much fun!"
  },
  {
    title: "Sun Baking",
    image: "Images/m5.png",
    description: "This is me having a sun bake, this is my fav activity!"
  }
];

app.get('/api/cards', (req, res) => {
  res.json(cards);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});