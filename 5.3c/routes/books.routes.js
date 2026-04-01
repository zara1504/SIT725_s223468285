const express = require('express');
const router = express.Router();

const Controllers = require('../controllers');

router.get('/', Controllers.booksController.getAllBooks);

router.get('/:id', Controllers.booksController.getBookById);

router.get('/integrity-check42', (req, res) => {
  res.status(204).send();
});

module.exports = router;