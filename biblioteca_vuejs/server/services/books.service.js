const boom = require('@hapi/boom');

const pool = require('../libs/postgres')
const {models} = require('./../libs/sequelize')
class BooksService {
    constructor(){
        this.books = [];
        this.generate();
        this.pool = pool;
        this.pool.on('error',(err)=>{console.error(err)})
    }

    generate() {
        const limit = 10;
        for (let index = 0; index < limit; index++) {
            this.books.push({
                // id: faker.datatype.uuid(),
                // name: faker.commerce.productName(),
                // price: parseInt(faker.commerce.price(), 10),
                // image: faker.image.imageUrl(),

                id: index,
                name: 'Libro-'+ index,
                description: 'awesome book',
                price: 200,
                // image: faker.image.imageUrl(),
            });
        }
    }
    async find() {
        const rta = await models.Book.findAll();
        return rta
    }

    async findOne(id) {
        const book = await models.Book.findByPk(id);
        if (!book){
            throw boom.notFound('Book not found')
        }
        return book;
    }

    async update(id, changes) {
        const book = await this.findOne(id);
        const rta = await book.update(changes);
        return rta;
    }

    async create(data) {
        const newBook =  await models.Book.create(data)
        return newBook;
    }

    async delete(id) {
        const book =  await this.findOne(id);
        await book.destroy();
        return {id};
    }
}

module.exports = BooksService;