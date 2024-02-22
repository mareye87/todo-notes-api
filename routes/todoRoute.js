import { ToDo } from "../models/toDoModel.js";
import express from "express";

const router = express.Router();

// create todo
router.post("/", async (request, response) => {
  try {
    if (!request.body.text) {
      return response.status(400).send({ message: "Can't add empty note" });
    }
    const newTodo = {
      text: request.body.text,
    };
    const todo = await ToDo.create(newTodo);
    return response.status(201).send(todo);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get all todos
router.get("/", async (request, response) => {
  try {
    const todos = await ToDo.find({});
    return response.status(200).json({
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get one todo by id
router.get("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const todo = await ToDo.findById(id);
    return response.status(200).json(todo);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update todo
router.put("/:id", async (request, response) => {
  try {
    if (!request.body.text) {
      return response.status(400).send({
        message: "Can't save empty note",
      });
    }
    const id = request.params.id;
    const result = await ToDo.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "Task not found" });
    }
    return response.status(200).send({ message: "Task updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//delete todo
router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const result = await ToDo.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Task not found" });
    }
    return response.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
