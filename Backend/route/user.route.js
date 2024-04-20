const router = require("express").Router();
const userController = require("../controller/user.controller");

router.get("/", userController.getAllUsers);
router.post("/", userController.saveNewUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;