'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      firstName: 'Danh',
      lastName: 'Ha',
      address: 'Hoai Duc',
      gender: 1,
      roleId: 'R1',
      phoneNumber: '012345678',
      positionId: 'professor',
      image: '1.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
