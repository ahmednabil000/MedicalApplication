const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../shared/auth-middleware');
const reservationsController = require('./reservations-controller');

/**
 * @openapi
 * /api/reservations:
 *   post:
 *     tags: [Reservations]
 *     summary: Create a reservation
 *     description: >
 *       Submits a new medical reservation for a patient. No authentication is
 *       required. The `assignedToId`, `status`, and `reason` fields are stored
 *       inside a linked `ReservationDetails` record and are all optional.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReservationBody'
 *           example:
 *             patientName: "Omar Tarek"
 *             age: 28
 *             egyptianMobileNumber: "01012345678"
 *             locationUrl: "https://maps.google.com/?q=30.0444,31.2357"
 *             service: "Chest X-ray"
 *             userId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *             reservationDate: "2026-06-20T09:30:00.000Z"
 *     responses:
 *       201:
 *         description: Reservation created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       400:
 *         description: Request body failed Joi validation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *             example:
 *               error: '"egyptianMobileNumber" with value "0123456789" fails to match the required pattern'
 *       500:
 *         description: Unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', reservationsController.createReservation);

/**
 * @openapi
 * /api/reservations:
 *   get:
 *     tags: [Reservations]
 *     summary: Get all reservations (paginated)
 *     description: >
 *       Returns a paginated list of all reservations ordered by
 *       `reservationDate` ascending. Optionally filter by date range.
 *       Requires a valid JWT issued to a `SUPER-ADMIN` or `ADMIN` account.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of reservations per page.
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: "Filter: include reservations on or after this date (ISO 8601)."
 *         example: "2026-06-01T00:00:00.000Z"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: "Filter: include reservations on or before this date (ISO 8601)."
 *         example: "2026-06-30T23:59:59.999Z"
 *     responses:
 *       200:
 *         description: Paginated reservations list.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedReservations'
 *       401:
 *         description: Missing or malformed Authorization header.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 *       403:
 *         description: Token expired/invalid, or caller lacks required role.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenResponse'
 *       500:
 *         description: Unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', authenticate, authorize("SUPER_ADMIN", "ADMIN"), reservationsController.getReservations);

/**
 * @openapi
 * /api/reservations/my-assigned:
 *   get:
 *     tags: [Reservations]
 *     summary: Get reservations assigned to the caller
 *     description: >
 *       Returns a paginated list of reservations whose `ReservationDetails.assignedToId`
 *       matches the authenticated admin's ID. Accepts the same date-range and
 *       pagination query parameters as `GET /api/reservations`.
 *       Requires a valid JWT issued to an `ADMIN` account.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Number of reservations per page.
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: "Filter: include reservations on or after this date (ISO 8601)."
 *         example: "2026-06-01T00:00:00.000Z"
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: "Filter: include reservations on or before this date (ISO 8601)."
 *         example: "2026-06-30T23:59:59.999Z"
 *     responses:
 *       200:
 *         description: Paginated reservations assigned to the caller.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedReservations'
 *       401:
 *         description: Missing or malformed Authorization header.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 *       403:
 *         description: Token expired/invalid, or caller is not ADMIN.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForbiddenResponse'
 *       500:
 *         description: Unexpected server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/my-assigned', authenticate, authorize("ADMIN"), reservationsController.getMyAssignedReservations);

module.exports = router;
