import React, { useState } from "react";
import { addNewTodo } from "../redux/actions";
import { useDispatch } from "react-redux";

const TodoForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewTodo(text));
    setText("");
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e)}>
      <input
        type="text" 
        className="input"
        onChange={(e) => handleInputChange(e)}
        value={text}
      />
      <label htmlFor="" className="input-label">
        Enter New Todo
      </label>
    </form>
  );
};

export default TodoForm;
