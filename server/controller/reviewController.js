import Model from '../models';

const { Business } = Model;
const { Review } = Model;
const { User } = Model;

/**
 * Business Controller.
 * @class ReviewController
 * */
export default class ReviewController {
  /**
   * Get all Reviews
   *
   * @param {object} request The requestuest body of the requestuest.
   * @param {object} response The responseponse body.
   * @returns {object} response.
   */
  static listReview(request, response) {
    Business.findById(request.params.id).then((business) => {
      if (!business) {
        return response.status(404).json({
          error: true,
          message: 'Business not found'
        });
      }
      Review.findAll({
        where: { businessId: business.id },
        include: [{
          model: User,
          as: 'reviewer',
          attributes: ['firstName']
        }]
      }).then(reviews =>
        // if (reviews.length === 0) {
        //   return response.status(404).json({
        //     error: true,
        //     message: 'No review found'
        //   });
        // }
        response.status(200).json({
          error: false,
          message: 'Reviews found',
          reviews,
        })).catch(error => response.status(500).json({
        error: error.message,
        message: 'Server Error',
      }));
    });
  }

  /**
   * Add a new Review
   *
   * @param {object} request The requestuest body of the requestuest.
   * @param {object} response The responseponse body.
   * @returns {object} response.
   */
  static addReview(request, response) {
    const { content, star } = request.body;
    const { userId } = request;
    const businessId = request.params.id;

    if (!content || !star) {
      return response.status(400).json({
        error: true,
        message: 'Input required field'
      });
    }
    Business.findById(businessId).then((business) => {
      if (!business) {
        return response.status(404).json({
          error: true,
          message: 'Business not found'
        });
      }
      // Will not allow you to review your business
      if (business.userId === userId) {
        return response.status(403).json({
          error: true,
          message: 'You cannot review your own business'
        });
      }

      Review.create({
        content, star, userId, businessId
      }).then(review => response.status(201).json({
        error: false,
        message: 'Review Created',
        review,
      })).catch((err) => {
        console.log(err);
        response.status(500).json({
          error: err,
          message: 'Server Error',
        });
      });
    });
  }
}
