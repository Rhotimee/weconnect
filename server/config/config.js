require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEVELOPMENT,
    host: process.env.HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'database_test',
    host: process.env.HOST,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  }
};
