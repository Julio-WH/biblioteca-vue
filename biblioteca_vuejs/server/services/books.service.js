const boom = require('@hapi/boom');
class BooksService {
    constructor(){
        this.books = [];
        this.generate();
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
    find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.books.reverse());
            }, 5000);
        })
    }

    async findOne(id) {
        return this.books.find(item=>item.id===parseInt(id));
    }
    async create(data) {
        const newBook={id: (this.books.length)+1,...data}
        this.books.push(newBook);
        return newBook;
    }

    async delete(id) {
        const index = this.books.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('product not found');
        }
        this.books.splice(index, 1);
        return { id };
    }
}

module.exports = BooksService;