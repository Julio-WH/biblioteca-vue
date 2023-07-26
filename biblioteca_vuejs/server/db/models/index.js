const {Book,BookSchema} = require("./book.model")

// Aqui se incrementaria los modelos
function setupModels(sequelize){
    Book.init(BookSchema,Book.config(sequelize));
}

module.exports = setupModels;