const router = require("express").Router();
const todoController = require("../controller/todo")

router.post('/add', todoController.CreateToDo)
router.get('/', todoController.getToDo)
router.put('/check/:todoId', todoController.checkToDo)

module.exports = router;