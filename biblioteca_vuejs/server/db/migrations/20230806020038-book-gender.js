'use strict';

const {BOOK_GENDER_TABLE, BookGenderSchema} = require("./../models/book-garder.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
      await queryInterface.createTable(BOOK_GENDER_TABLE, BookGenderSchema)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(BOOK_GENDER_TABLE)
  }
};
