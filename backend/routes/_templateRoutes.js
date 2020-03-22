const express = require("express");
const router = express.Router();
const userController = require("../controllers/_templateController");

/*
 * GET
 */
router.get("/", userController.list);

/*
 * GET
 */
router.get("/:id", userController.show);

/*
 * POST
 */
router.post("/", userController.create);

/*
 * PATCH
 */
router.patch("/:id", userController.update);

/*
 * DELETE
 */
router.delete("/:id", userController.destroy);

module.exports = router;
