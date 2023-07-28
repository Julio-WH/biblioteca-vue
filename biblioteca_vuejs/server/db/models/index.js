const {Book,BookSchema} = require("./book.model")
const {Author,AuthorSchema} = require("./author.model")

// Aqui se incrementaria los modelos
function setupModels(sequelize){
    Book.init(BookSchema,Book.config(sequelize));
    Author.init(AuthorSchema,Author.config(sequelize));
}

module.exports = setupModels;