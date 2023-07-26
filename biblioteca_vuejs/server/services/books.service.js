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
        const book = this.books.find(item=>item.id===parseInt(id));
        if (!book) {
            throw boom.notFound('book not found');
        }
        return book
    }

    async update(id, changes) {
        const index = this.books.findIndex(item => item.id === parseInt(id));
        if (index === -1) {
            throw boom.notFound('book not found');
        }
        const book = this.books[index];
        this.books[index] = {
        ...book,
        ...changes
        };
    return this.books[index];
    }

    async create(data) {
        const newBook={id: (this.books.length)+1,...data}
        this.books.push(newBook);
        return newBook;
    }

    async delete(id) {
        const index = this.books.findIndex(item => item.id === parseInt(id));
        if (index === -1) {
            throw boom.notFound('book not found');
        }
        this.books.splice(index, 1);
        return { id };
    }
}

module.exports = BooksService;