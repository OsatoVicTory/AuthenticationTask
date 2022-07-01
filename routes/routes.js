let toDo = require("../models/models.js");
const express = require("express");
const router = express.Router();

//load up all todos
router.get("/", (req, res) => {
    toDo.find()
      .then(todos => {
        if(todos.length == 0) res.status(200).json({ "message": "No Todos Presently"})
        else res.status(200).json(todos)
      })
      .catch(err => res.status(500).json({ "message": err }))
});

//get todo task by id
router.get("/:id", (req, res) => {
    toDo.findById(req.params.id)
      .then(todo => res.status(200).json(todo))
      .catch(err => res.status(500).json({ "message": err }))
});

//add new todo task
router.post("/add", (req, res) => {
    let { title, description } = req.body;
    const newTodo = new toDo({
        title,
        description
    });
    newTodo.save()
      .then(() => res.status(200).json("Todo added"))
      .catch(err => res.status(500).json({ "message": err }))
})

//update by id
router.put("/update/:id", (req, res) => {
    toDo.findById(req.params.id)
        .then(todo => {
            todo.title = req.body.title;
            todo.description = req.body.description;

            todo.save()
                .then(() => res.status(200).json("Todo updated"))
                .catch(err => res.status(500).json({ "message": err }))
        })
        .catch(err => res.status(500).json({ "message": err }))
})

//delete all todos
router.delete("/delete", (req, res) => {
    toDo.deleteMany()
      .then(() => res.status(200).json('All Todos Deleted'))
      .catch((err => res.status(500).json({ "message": err })))
})

//delete by id
router.delete("/delete/:id", (req, res) => {
    toDo.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).json('Todo Deleted'))
      .catch((err => res.status(500).json({ "message": err })))
})

module.exports = router;