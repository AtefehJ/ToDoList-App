const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path = require("path");

// import bodyParser from "body-parser";
// import cors from "cors";
// import pg from "pg";

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
const { Pool } = require("pg");

// app.use(express.static("./client/build"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);
console.log(path.join(__dirname, "client/build"));

//configure the PostgreSQL connection
// const db = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "todolist",
//   password: "Eti0912106@",
//   port: 5432,
// });

const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
};

const proConfig = {
  connectionString: process.env.DATABASE_URL, // Heroku add-ons -> to connect postgres cloud service
};

const db = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
);

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
