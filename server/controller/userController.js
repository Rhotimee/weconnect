import jwt from 'jsonwebtoken';
import { isEmail } from 'validator';
import bcrypt from 'bcrypt';
import Model from '../models';

const { User, Business, Review } = Model;

/**
 * Business Controller.
 * @class BusinessController
 * */
export default class UserController {
  /**
   * List all users
   *
   * @param {object} request The request body of the requestuest.
   * @param {object} response The response body.
   * @returns {object} response.
   */
  static list(request, response) {
    User.findAll({})
      .then((users) => {
        if (users.length === 0) {
          return response.status(404).send({
            error: true,
            message: 'No user found'
          });
        }
        response.status(200).send({
          error: false,
          users,
        });
      }).catch(() => {
        response.status(500).json({
          error: true,
          message: 'Server Error'
        });
      });
  }

  /**
   * Signup
   *
   * @param {object} request The requestuest body of the requestuest.
   * @param {object} response The responseponse body.
   * @returns {object} response.
   */
  static signUp(request, response) {
    const {
      email, password, firstName, lastName
    } = request.body;

    if (!isEmail(email) || !password || !firstName || !lastName) {
      return response.status(400).json({
        message: 'Enter Valid Input',
        error: true,
      });
    }

    User.findOne({ where: { email: email.trim().toLowerCase() } })
      .then((userExists) => {
        if (userExists) {
          return response.status(409).json({
            error: true,
            message: 'Account exists for that email'
          });
        }
      });

    const hash = bcrypt.hashSync(password, 10);
    User.create({
      firstName,
      lastName,
      email: email.trim().toLowerCase(),
      password: hash,
    }).then((user) => {
      const token = jwt.sign({ id: user.id, firstName: user.firstName }, process.env.SALT, { expiresIn: 86400 * 5 });
      return response.status(201).json({
        token,
        error: false,
        message: 'User created and logged in',
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    });
  }

  /**
   * Login
   *
   * @param {object} request The requestuest body of the requestuest.
   * @param {object} response The responseponse body.
   * @returns {object} response.
   */
  static logIn(request, response) {
    const { email, password } = request.body;
    User.findOne({ where: { email: email.trim().toLowerCase() } })
      .then((user) => {
        if (!user) {
          return response.status(401).json({
            error: true,
            message: 'Email or Password Incorrect'
          });
        }
        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) {
          return response.status(401).json({
            error: true,
            message: 'Email or Password Incorrect'
          });
        }
        const token = jwt.sign({ id: user.id, firstName: user.firstName }, process.env.SALT, { expiresIn: 86400 * 5 });

        return response.status(200).json({
          token,
          error: false,
          message: 'Logged in Successfully',
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          }
        });
      });
  }

  /**
   * Log out
   * @param {object} request The requestuest body of the requestuest.
   * @param {object} response The responseponse body.
   * @returns {object} response.
   */
  static logout(request, response) {
    response.setHeader('x-access-token', null);
    return response.status(200).send({
      error: false,
      message: 'User has been logged out',
      token: null
    });
  }

  /**
   * Get User
   * @param {object} request The requestuest body of the requestuest.
   * @param {object} response The responseponse body.
   * @returns {object} response.
   */
  static getUser(request, response) {
    User.findOne({
      where: { id: request.params.id },
      include: [{
        model: Business,
        as: 'businesses',
        attributes: ['name', 'details', 'id']
      },
      {
        model: Review,
        as: 'reviews',
        attributes: ['content', 'star', 'userId', 'businessId']
      }]
    }).then((user) => {
      if (!user) {
        return response.status(404).json({
          error: true,
          message: 'User not found',
        });
      }
      return response.status(200).json({
        error: false,
        message: 'User found',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          businesses: user.businesses,
          reviews: user.reviews
        }
      });
    });
  }
  /**
   * Update user details
   * @param {object} request The requestuest body of the requestuest.
   * @param {object} response The responseponse body.
   * @returns {object} response.
   */
  static updateUser(request, response) {
    User.findById(request.params.id)
      .then((user) => {
        if (!user) {
          return response.status(404).json({
            error: true,
            message: 'User not found'
          });
        }

        if (request.userId !== user.id) {
          return response.status(400).json({
            error: true,
            message: 'You do not have the permission to update this user'
          });
        }

        user.update({
          firstName: request.body.firstName || user.firstName,
          lastName: request.body.lastName || user.lastName,
        }).then((updatedUser) => {
          if (!updatedUser) {
            return response.status(500).json({
              error: true,
              message: 'Server error'
            });
          }
          return response.status(200).json({
            error: false,
            message: 'User updated',
            data: updatedUser
          });
        });
      });
  }
}
