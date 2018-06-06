# weconnect
[![Build Status](https://travis-ci.org/Rhotimee/weconnect.svg?branch=develop)](https://travis-ci.org/Rhotimee/weconnect) [![Coverage Status](https://coveralls.io/repos/github/Rhotimee/weconnect/badge.svg)](https://coveralls.io/github/Rhotimee/weconnect) [![Maintainability](https://api.codeclimate.com/v1/badges/876431ea563b9f8a8972/maintainability)](https://codeclimate.com/github/Rhotimee/weconnect/maintainability)

WeConnect provides a platform that brings businesses and individuals together. This platform creates awareness for businesses and gives the users the ability to write reviews about the businesses they have interacted with.

Live Template: https://rhotimee.github.io/weconnect/index.html

Live API: https://weconnect-business.herokuapp.com/

### Features
- Sign up: `POST api/v1/auth/signup`
- Log in: `POST api/v1/auth/login`
- Register a buisness `POST api/v1/businesses`
- Update business profile `PUT api/v1/businesses/<id>`
- Delete a business `DELETE api/v1/businesses/<id>`
- List all businesses `GET api/v1/businesses`
- Get details of a business `GET api/v1/businesses/<id>`
- Add reviews for business `POST api/v1/businesses/<id>/reviews`
- Get all reviews for a business `GET api/v1/businesses/<id>/reviews`
- Filter businesses by location `GET api/v1/businesses?location=<location>`
- Filter businesses by category `GET api/v1/businesses?category=<category>`

#### Dependencies
- Express JS: Web application framework for Node.js.
- Bcrypt: Hashing the Password
- Jsonwebtoken: Authentication
- Swagger-ui-express: For wroting documentation
- Validator: library of string validators and sanitizers
- Sequelize: ORM for Postgres

#### Dev Dependencies
- Coveralls: Helps to show which part code is not covered by test suite
- Eslint: Linting utility for JavaScript and JSX
- Babel: The compiler for writing next generation JavaScript.
- Mocha & Chai: Testing the Web Application
- Chai: TDD assertion library for node
- Nodemon: Utility that will monitor for any changes in your source and automatically restart your server.

### Setup Setup and Installation
- Create a parent folder on your system
- Clone repo. `$ git clone https://github.com/Rhotimee/weconnect`
- Instll all dependencies
`$ npm install`
- Switch to develop branch
`$ git checkout develop`
- Start the server
`$ npm start`
- Run Tests
`$ npm test`

### How To Contribute
- Fork the project & clone locally.
- Branch for each separate piece of work `$ git checkout -b <branch-name>`
- Do the work, write good commit messages.
- Push to your origin repository.
- Create a new PR in GitHub.
- Wait for approval.


#### Author
[Yemitan Isaiah Olurotimi](https://twitter.com/rhotimee)

#### License
This project is licensed under the MIT license. See the [LICENSE](https://github.com/Rhotimee/weconnect/blob/develop/LICENSE) file for more info.