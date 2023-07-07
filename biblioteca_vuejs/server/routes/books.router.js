const express = require('express');
const BooksService = require('./../services/books.service');

const router = express.Router();
const service = new BooksService();


router.get('/', async (req, res) => {
    const products = await service.find();
    res.json(products);
});

module.exports = router;