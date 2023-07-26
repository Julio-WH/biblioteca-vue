const {Model, DataTypes, Sequelize} = require('sequelize')

const BOOK_TABLE = 'books';

const BookSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey:true,
        type: DataTypes.INTEGER
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt:{
        allowNull: false,
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
}

class Book extends Model {
    static associate(){
        // associate
    }
    static  config(sequelize) {
        return {
            sequelize,
            tableName:BOOK_TABLE,
            modelName:'Book',
            timestamps:false
        }
    }
}

module.exports = {BOOK_TABLE, BookSchema, Book}