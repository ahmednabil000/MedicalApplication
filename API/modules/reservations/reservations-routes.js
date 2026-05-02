const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../shared/auth-middleware');
const reservationsController = require('./reservations-controller');

router.post('/', reservationsController.createReservation);
router.get('/', authenticate, authorize("SUPER_ADMIN", "ADMIN"), reservationsController.getReservations);
router.get('/my-assigned', authenticate, authorize("ADMIN"), reservationsController.getMyAssignedReservations);

module.exports = router;
