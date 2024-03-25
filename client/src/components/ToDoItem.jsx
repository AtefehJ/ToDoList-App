import React, { useEffect, useState } from "react";
import "../index.css";
import EditToDo from "./EditToDo";

function ToDoItem(props) {
  const [items, setItems] = useState([]);

  const deleteItem = async (id) => {
    try {
      const deleteTodo = await fetch(`/todos/${id}`, {
        method: "DELETE",
      });

      setItems(items.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTodos = async () => {
    try {
      const response = await fetch(`/todos`);
      const myJsonData = await response.json();
      // console.log(myJsonData);
      setItems(myJsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);
  // console.log(items);
  return (
    <div className="addItems">
      <table>
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td width="100%">{item.description}</td>
              <td>
                <EditToDo edit={item} />
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ToDoItem;
