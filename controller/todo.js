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