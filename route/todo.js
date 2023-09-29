const router = require("express").Router();
const todoController = require("../controller/todo")

router.post('/add', todoController.CreateToDo)
router.get('/', todoController.getToDo)
router.put('/check/:todoId', todoController.checkToDo)
router.get('/done', todoController.getDoneToDo)
router.put('/checkdone/:todoId', todoController.checkDoneToDo)
router.get('/:todoId', todoController.getOneToDO)
router.delete('/delete/:todoId', todoController.deleteToDo)
router.put('/update/:todoId', todoController.updateToDo)

module.exports = router;