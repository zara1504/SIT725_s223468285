const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Quote Part (From week 2 prac)
let quotes = [
  "The best way to predict the future is to invent it.",
  "Life is 10% what happens to us and 90% how we react to it.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Do not wait to strike till the iron is hot; but make it hot by striking."
];

app.get('/api/quote', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json({ quote: quotes[randomIndex] });
});

app.post('/api/quote', (req, res) => {
  const { quote } = req.body;
  if (!quote || typeof quote !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid quote.' });
  }
  quotes.push(quote);
  res.json({ message: 'Quote added successfully.', quotes });
});

// Calculator part (2.2p task)
// GET endpoints for the four operations (addition, subtraction, multplication, division)
app.get('/add', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (isNaN(a) || isNaN(b)) return res.status(400).send("Please provide valid numbers using ?a= & ?b=");
  res.json({ operation: "addition", a, b, result: a + b });
});

app.get('/subtract', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (isNaN(a) || isNaN(b)) return res.status(400).send("Please provide valid numbers");
  res.json({ operation: "subtraction", result: a - b });
});

app.get('/multiply', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (isNaN(a) || isNaN(b)) return res.status(400).send("Please provide valid numbers");
  res.json({ operation: "multiplication", result: a * b });
});

app.get('/divide', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  if (isNaN(a) || isNaN(b)) return res.status(400).send("Please provide valid numbers");
  if (b === 0) return res.status(400).send("Cannot divide by zero");
  res.json({ operation: "division", result: a / b });
});

// POST endpoint for the four operations
app.post('/calculate', (req, res) => {
  const { a, b, operation } = req.body;

  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: "a and b must be numbers" });
  }

  let result;

  switch(operation) {
    case "add":
      result = a + b;
      break;
    case "subtract":
      result = a - b;
      break;
    case "multiply":
      result = a * b;
      break;
    case "divide":
      if (b === 0) return res.status(400).json({ error: "Cannot divide by zero" });
      result = a / b;
      break;
    default:
      return res.status(400).json({ error: "Invalid operation" });
  }

  res.json({ a, b, operation, result });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});