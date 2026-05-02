const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../shared/auth-middleware");

const usersController = require("./users-controller");

/**
 * @openapi
 * /api/users/users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     description: >
 *       Returns an array of all registered users including their associated
 *       reservations. No authentication is currently required for this endpoint.
 *     responses:
 *       200:
 *         description: List of all users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/User'
 *                   - type: object
 *                     properties:
 *                       reservations:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Reservation'
 *             example:
 *               - id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *                 name: "Ahmed Ali"
 *                 email: "ahmed@example.com"
 *                 phone: "01012345678"
 *                 role: "CLIENT"
 *                 reservations: []
 */
router.get("/users", usersController.getUsers);

/**
 * @openapi
 * /api/users/users/admin:
 *   post:
 *     tags: [Users]
 *     summary: Create an admin user
 *     description: >
 *       Creates a new user account with the `ADMIN` role. The `role` field in
 *       the request body is accepted by the schema but is overridden to `ADMIN`
 *       regardless of the value provided. Requires a valid JWT issued to a
 *       `SUPER-ADMIN` account.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserBody'
 *           example:
 *             name: "New Admin"
 *             phone: "01198765432"
 *             password: "SecureP@ss1"
 *     responses:
 *       201:
 *         description: Admin user created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *             example:
 *               id: "c3d4e5f6-a7b8-9012-cdef-012345678902"
 *               name: "New Admin"
 *               phone: "01198765432"
 *               email: null
 *               role: "ADMIN"
 *       400:
 *         description: Request body failed Joi validation.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationErrorResponse'
 *             example:
 *               error: '"name" is required'
 *       401:
 *         description: Missing or malformed Authorization header.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 *       403:
 *         description: Token expired/invalid, or caller is not SUPER-ADMIN.
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
router.post("/users/admin", authenticate, authorize("SUPER_ADMIN"), usersController.createAdmin);

module.exports = router;
