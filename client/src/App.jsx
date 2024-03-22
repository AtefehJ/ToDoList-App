import React from "react";
import InputArea from "./components/InputArea";
import ToDoItem from "./components/ToDoItem";

function App() {
  return (
    <div className="container">
      <div className="heading">
        <h1>To-DO-List</h1>
      </div>
      <div>
        <p>
          -Add your lists inside the input area and then click the Add button.
        </p>
        <p>-You can also remove or Edit your lists.</p>
      </div>
      <InputArea />
      <ToDoItem />
    </div>
  );
}

export default App;
