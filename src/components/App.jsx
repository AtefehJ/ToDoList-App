import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import InputArea from "./InputArea";

function App() {
  const [items, setItems] = useState([]);

  function handleClick(inputText) {
    setItems((prev) => [...prev, inputText]);
  }

  function deleteItem(id) {
    setItems((prev) => {
      return prev.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div>
        <p>
          -Add your items inside the input area and then click the Add button.
        </p>
        <p>-You can also remove your items by clicking on them.</p>
      </div>

      <InputArea onAdd={handleClick} />
      <div className="addItems">
        <ul>
          {items.map((item, index) => (
            <ToDoItem
              key={index}
              id={index}
              onchecked={deleteItem}
              text={item}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
