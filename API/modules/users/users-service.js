const { prisma } = require("../../config/database-config");
const bcrypt = require("bcryptjs");

const getUsers = async () => {
  return await prisma.user.findMany({
    include: { reservations: true },
  });
};

const createAdminUser = async (data) => {
  const { password, ...userData } = data;
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  return await prisma.user.create({
    data: {
      ...userData,
      hashPassword,
      role: "ADMIN"
    }
  });
};

module.exports = { getUsers, createAdminUser };
