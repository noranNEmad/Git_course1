const router = require("express").Router()
const userController = require('../app/controllers/user.controller')

router.get("/", userController.showAll)
router.get("/add", userController.addCustomer)
router.get("/show/:id", userController.show)
router.get("/addop/:id", userController.addop)
router.get("/delete/:id", userController.deleteCustomer)
module.exports = router