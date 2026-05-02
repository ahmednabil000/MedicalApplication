const Joi = require('joi');
const { ROLES } = require('../shared/constants');

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().valid(...Object.values(ROLES)).optional()
});

module.exports = {
  createUserSchema
};
