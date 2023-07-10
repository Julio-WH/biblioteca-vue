const express = require('express');
const BooksService = require('./../services/books.service');

const router = express.Router();
const service = new BooksService();


router.get('/', async (req, res) => {
    const products = await service.find();
    res.json(products);
});

router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body)
    const newBook = await service.create(body);
    res.status(201).json(newBook);
});

module.exports = router;