import React, { useState } from "react";

function InputArea(props) {
  const [description, setDescription] = useState("");

  function handleChange(event) {
    const result = event.target.value;
    setDescription(result);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(`/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // console.log(response);
      // setDescription("");
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="form">
      <form onSubmit={submitForm}>
        <input onChange={handleChange} value={description} type="text" />
        <button
        // onClick={() => {
        //   props.onAdd(description);
        // }}
        >
          <span>Add</span>
        </button>
      </form>
    </div>
  );
}

export default InputArea;
