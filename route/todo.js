const router = require("express").Router();
const todoController = require("../controller/todo")

router.post('/add', todoController.CreateToDo)

module.exports = router;