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

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const book = await service.findOne(id);
        res.json(book);
    } catch (error) {
        console.error(error)
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const body = req.body;
        const product = await service.update(id, body);
        res.json(product);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
});

module.exports = router;