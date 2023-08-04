'use strict';

const {BOOK_TABLE,BookSchema} = require("./../models/book.model")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(BOOK_TABLE, 'status', BookSchema.status);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(BOOK_TABLE, 'status');
  }
};
