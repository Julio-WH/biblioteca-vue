const Joi = require('joi');

const id = Joi.number().integer()
const name = Joi.string().min(3).max(100);
const description = Joi.string().alphanum().min(3).max(150);
const price = Joi.number().integer().min(10);

const createBookSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    description: description.required(),
});

const updateBookSchema = Joi.object({
    name: name,
    price: price,
    description: description,
});

const getBookSchema = Joi.object({
    id: id.required(),
});

module.exports = { createBookSchema, updateBookSchema, getBookSchema }