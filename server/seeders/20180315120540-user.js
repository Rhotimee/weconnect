const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    firstName: 'AdminName',
    lastName: 'AdminLastname',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('password', 10),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }, {
    firstName: 'Ade',
    lastName: 'Moreni',
    email: 'admin111@admin.com',
    password: bcrypt.hashSync('password111', 10),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users')
};
