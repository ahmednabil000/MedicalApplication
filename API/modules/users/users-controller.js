const { createUserSchema } = require("./user-schema");
const usersService = require("./users-service");

const getUsers = async (req, res) => {
  return res.json(await usersService.getUsers());
};

const createAdmin = async (req, res) => {
  try {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    value.role = "ADMIN";
    
    const user = await usersService.createAdminUser(value);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getUsers,
  createAdmin
};
