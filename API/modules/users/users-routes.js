const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../shared/auth-middleware");

const usersController = require("./users-controller");

router.get("/users", usersController.getUsers);
router.post("/users/admin", authenticate, authorize("SUPER_ADMIN"), usersController.createAdmin);

module.exports = router;
