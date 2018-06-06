module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Businesses', [{
      userId: 1,
      name: 'Andela',
      details: 'Andela invests in Africa\'s most talented developers and integrates them into the world\'s best tech companies',
      location: 'lagos',
      category: 'Ict',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }, {
      userId: 2,
      name: 'Flutterwave',
      details: 'Modern payments infrastructure to power Africa’s digital economy.',
      location: 'abuja',
      category: 'fin-tech',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Businesses')
};
