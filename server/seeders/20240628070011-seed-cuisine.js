'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const cuisines = require('../data/cuisine.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
     })
     await queryInterface.bulkInsert('Cuisines', cuisines)
    },
  
    async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Cuisines', null, {truncate: true, restartIdentity: true})
    }
  }