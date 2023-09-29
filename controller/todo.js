const ToDo = require("../model/todo")

module.exports.CreateToDo = (async function (req, res) {
    const data = req.body;
    if (!(data.title && data.description && data.checked !== undefined && data.checked !== null && data.checked !== '')) {
        return res.json({
          msg: "Inputs are required",
        });
      }
  
    const inputData = {
        title: data.title,
        description: data.description,
        checked: data.checked,
    }
   
    const new_todo = new ToDo(inputData);
  
    await new_todo.save();
    return res
      .json({
        msg: "ToDo created successfully",
      })
      .status(200);
  });


  module.exports.getToDo = async function (req, res) {
    try {
        const todos = await ToDo.find({ checked: false }).sort({ createdAt: -1 });
      const data = todos.map((todo) => ({
        _id: todo._id,
        title: todo.title,
        description: todo.description,
        checked: todo.checked
      }));
  
      return res.status(200).json({
        todos: data,
      });
    } catch (error) {
      console.error('Error retrieving todo:', error);
      return res.status(500).json({
        error: 'Server error',
      });
    }
  };

  module.exports.checkToDo = async function (req, res) {
    const { todoId } = req.params;
    try {
      const updatedTodo = await ToDo.findOneAndUpdate(
        { _id: todoId },
        { checked: true },
        { new: true }
      );
  
      if (!updatedTodo) {
        return res.status(404).json({ msg: 'ToDo not found' });
      }
  
      return res.status(200).json({ msg: 'Todo checked successfully' });
    } catch (error) {
      console.error('Error checking todo:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  };

  module.exports.getDoneToDo = async function (req, res) {
    try {
        const todos = await ToDo.find({ checked: true }).sort({ createdAt: -1 });
      const data = todos.map((todo) => ({
        _id: todo._id,
        title: todo.title,
        description: todo.description,
        checked: todo.checked
      }));
  
      return res.status(200).json({
        todos: data,
      });
    } catch (error) {
      console.error('Error retrieving todo:', error);
      return res.status(500).json({
        error: 'Server error',
      });
    }
  };

  module.exports.checkDoneToDo = async function (req, res) {
    const { todoId } = req.params;
    try {
      const updatedTodo = await ToDo.findOneAndUpdate(
        { _id: todoId },
        { checked: false },
        { new: true }
      );
  
      if (!updatedTodo) {
        return res.status(404).json({ msg: 'ToDo not found' });
      }
  
      return res.status(200).json({ msg: 'Todo checked successfully' });
    } catch (error) {
      console.error('Error checking todo:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  };

  module.exports.getOneToDO = async function (req, res) {
    const { todoId } = req.params;
    const oneToDo = await ToDo.findById(todoId);
    if (!oneToDo) {
      return res
        .json({
          msg: "Id dont exist",
        })
        .status(403);
    }
    return res
      .json({
        msg: oneToDo,  
      })
      .status(200);
  };

  module.exports.deleteToDo = async function(req, res) {
    const { todoId } = req.params;
  
    try {
      const todo = await ToDo.findById(todoId);
  
      if (!todo) {
        return res.status(404).json({ msg: 'ToDo not found' });
      }
  
      await ToDo.findByIdAndDelete(todoId);
      return res.status(200).json({ msg: 'ToDo deleted successfully' });
    } catch (error) {
      console.error('Error deleting ToDo:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  };

  module.exports.updateToDo = async function (req, res) {
    const { todoId } = req.params;

    const data = req.body;
    if (!(data.title && data.description && data.checked !== undefined && data.checked !== null && data.checked !== '')) {
        return res.json({
          msg: "Inputs are required",
        });
      }
  
    const updatedData = {
        title: data.title,
        description: data.description,
        checked: data.checked,
    }
  
    try {
      const todo= await ToDo.findById(todoId);
  
      if (!todo) {
        return res.status(404).json({ msg: 'ToDo not found' });
      }
  
      await ToDo.findByIdAndUpdate(todoId, updatedData);
      return res.status(200).json({ msg: 'ToDo updated successfully' });
    } catch (error) {
      console.error('Error updating blog:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  };