'use strict';
const {BOOK_TABLE,BookSchema} = require("./../models/book.model")
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(BOOK_TABLE, 'author_id', BookSchema.authorId);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(BOOK_TABLE, 'author_id');
  }
};
