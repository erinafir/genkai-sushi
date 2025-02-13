"use strict";

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = bcrypt.genSaltSync(10);

    await queryInterface.bulkInsert("Users", [
      {
        username: "Admin",
        email: "admin@mail.com",
        password: bcrypt.hashSync("12345", salt),
        role: "admin",
        phoneNumber: "0123456789",
        address: "addressadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Staff",
        email: "staff@mail.com",
        password: bcrypt.hashSync("12345", salt),
        phoneNumber: "927310412",
        address: "addressstaff",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {truncate: true, restartIdentity: true});
  },
};
