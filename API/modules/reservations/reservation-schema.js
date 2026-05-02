const Joi = require('joi');
const { SERVICES, RESERVATION_STATUS } = require('../shared/constants');

const createReservationSchema = Joi.object({
  patientName: Joi.string().required(),
  age: Joi.number().integer().positive().required(),
  egyptianMobileNumber: Joi.string().pattern(/^(010|011|012|015)[0-9]{8}$/).required(),
  locationUrl: Joi.string().uri().optional(),
  service: Joi.string().valid(...SERVICES).required(),
  userId: Joi.string().uuid().required(),
  reservationDate: Joi.date().iso().required(),
  assignedToId: Joi.string().uuid().optional(),
  status: Joi.string().valid(...Object.values(RESERVATION_STATUS)).optional(),
  reason: Joi.string().optional()
});

module.exports = {
  createReservationSchema
};
