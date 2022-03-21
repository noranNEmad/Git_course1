const router = require("express").Router()
const userController = require('../app/controllers/user.controller')


router.get("/", userController.showAll)
router.get("/add", userController.addcustomer)
router.post("/add", userController.addLogic)

router.get("/show/:id", userController.show)
router.get("/delete/:id", userController.deletecustomer)

router.get("/addop/:id", userController.addop)

router.post("/addop/:id", userController.addopLogic)
module.exports = router