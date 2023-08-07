"use strict";

const { GENDER_TABLE, GenderSchema } = require("./../models/genders.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(GENDER_TABLE, GenderSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(GENDER_TABLE);
  },
};
