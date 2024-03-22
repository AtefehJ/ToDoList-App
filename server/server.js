const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

// import bodyParser from "body-parser";
// import cors from "cors";
// import pg from "pg";

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const { Pool } = require("pg");

//configure the PostgreSQL connection
// const db = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "todolist",
//   password: "Eti0912106@",
//   port: 5432,
// });

const db = new Pool({
  user: "postgres",
  host: process.env.HOST,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
  database: "todolist",
});

// db.connect();

//Routes

//create a todo
app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodoList = await db.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING * ",
      [description]
    );

    res.json(newTodoList.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await db.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await db.query("SELECT * FROM todo WHERE id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await db.query(
      "UPDATE todo SET description = $1 WHERE id = $2",
      [description, id]
    );
    res.json("To-Do-List was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await db.query("DELETE FROM todo WHERE id = $1", [id]);
    res.json("To-Do-List was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

// const port = 5000;
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
