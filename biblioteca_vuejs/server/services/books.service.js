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
                price: 200,
                // image: faker.image.imageUrl(),
            });
        }
    }
    find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.books);
            }, 5000);
        })
    }
}

module.exports = BooksService;