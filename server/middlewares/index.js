import isInt from 'validator/lib/isInt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import Model from '../models';
import upload from '../utils/upload';

dotenv.config();
const { Business } = Model;

const businessImgUpload = upload.single('businessImage');
// const userImgUpload = upload.single('userImg');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});


/**
 * Middleware
 * @class Middleware
 * */
export default class Middleware {
  /**
   * Register a new business
   *
   * @param {object} request The request body.
   * @param {object} response The response body.
   * @param {object} next Run the controller.
   * @returns {object} response.
   */
  static sorter(request, response, next) {
    const { location, category } = request.query;

    if (!location && !category) {
      next();
    }

    if (location) {
      Business.findAll({
        where: {
          location:
          { $ilike: `%${location}%` }
        }
      }).then((businesses) => {
        if (businesses.length === 0) {
          return response.status(404).json({
            error: true,
            message: `No business found in ${location}`
          });
        }
        return response.status(200).json({
          error: false,
          businesses,
        });
      });
    }

    if (category) {
      Business.findAll({
        where: {
          category: { $ilike: `%${category}%` }
        }
      }).then((businesses) => {
        if (businesses.length === 0) {
          return response.status(404).json({
            error: true,
            message: `No business found in ${category}`
          });
        }
        return response.status(200).json({
          error: false,
          businesses,
        });
      });
    }
  }

  /**
   * Checks if a user is logged in
   * @param {object} request The request body of the requestuest.
   * @param {object} response The response body.
   * @param {object} next Passes control to next middleware
   * @returns {object} next
   */
  static isLoggedIn(request, response, next) {
    const token = request.body.token || request.query.token || request.headers['x-access-token'] || request.headers.authorization;
    jwt.verify(token, process.env.SALT, (err, decoded) => {
      if (err) {
        return response.status(401).json({
          error: true,
          message: 'User not logged in'
        });
      }
      request.userId = decoded.id;
      return next();
    });
  }
  /**
   * Checks if a user is logged in
   * @param {object} request The request body of the requestuest.
   * @param {object} response The response body.
   * @param {object} next Passes control to next middleware
   * @returns {object} next
   */
  static validParam(request, response, next) {
    const reqId = request.params.id;
    const id = isInt(reqId);
    if (!id) {
      return response.status(400).json({
        error: true,
        message: 'Invalid params'
      });
    }
    next();
  }

  /**
   * Checks if a user is logged in
   * @param {object} request The request body of the requestuest.
   * @param {object} response The response body.
   * @param {object} next Passes control to next middleware
   * @returns {object} next
   */
  static businessImageUpload(request, response, next) {
    businessImgUpload(request, response, (error) => {
      if (error) {
        return response.status(400).json({
          error: true,
          message: 'failed to upload'
        });
      } else if (request.file) {
        cloudinary.v2.uploader.upload(request.file.path, (err, result) => {
          console.log(result);
          request.body.businessImage = result.secure_url;
          console.log('moving on to the business controller');
          next();
        });
      } else {
        next();
      }
    });
  }
}
