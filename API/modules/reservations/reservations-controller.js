const { createReservationSchema } = require('./reservation-schema');
const reservationsService = require('./reservations-service');

const createReservation = async (req, res) => {
  try {
    const { error, value } = createReservationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const reservation = await reservationsService.createReservation(value);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getReservations = async (req, res) => {
  try {
    const { page, limit, startDate, endDate } = req.query;
    const result = await reservationsService.getReservations({ page, limit, startDate, endDate });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getMyAssignedReservations = async (req, res) => {
  try {
    const { page, limit, startDate, endDate } = req.query;
    const assignedToId = req.user.id;
    const result = await reservationsService.getReservations({ page, limit, startDate, endDate, assignedToId });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createReservation,
  getReservations,
  getMyAssignedReservations
};
