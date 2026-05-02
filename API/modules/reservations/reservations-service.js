const { prisma } = require('../../config/database-config');

const createReservation = async (data) => {
  const { assignedToId, status, reason, ...reservationData } = data;

  return await prisma.reservation.create({
    data: {
      ...reservationData,
      details: {
        create: {
          ...(assignedToId && { assignedToId }),
          ...(status && { status }),
          ...(reason && { reason })
        }
      }
    }
  });
};

const getReservations = async ({ page = 1, limit = 10, startDate, endDate, assignedToId }) => {
  const skip = (page - 1) * limit;
  const take = parseInt(limit);
  
  const where = {};
  if (startDate || endDate) {
    where.reservationDate = {};
    if (startDate) where.reservationDate.gte = new Date(startDate);
    if (endDate) where.reservationDate.lte = new Date(endDate);
  }
  if (assignedToId) {
    where.details = { assignedToId };
  }
  
  const [data, total] = await Promise.all([
    prisma.reservation.findMany({
      where,
      skip,
      take,
      orderBy: { reservationDate: 'asc' }, // Assuming reservationDate is a field
      include: {
        details: true
      }
    }),
    prisma.reservation.count({ where })
  ]);
  
  return {
    data,
    meta: {
      total,
      page: parseInt(page),
      limit: take,
      totalPages: Math.ceil(total / take)
    }
  };
};

module.exports = {
  createReservation,
  getReservations
};
