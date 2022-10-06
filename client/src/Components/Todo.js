import React, { useEffect, useState } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import randomColor from "randomcolor";
import { useTransition, animated } from "react-spring";
import { toggleTodo, updateTodo, deleteTodo } from "../redux/actions";
import { useDispatch } from "react-redux";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [text, setText] = useState(todo.data);
  const transition = useTransition(isVisible, {
    from: { x: -100, y: 800, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 100, y: 0, opacity: 0 },
  });

  let color = randomColor({
    luminosity: "light",
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditing((prevState) => !prevState);
    dispatch(updateTodo(todo._id, text));
  };

  const handleDeleteTodo = () => {
    dispatch(deleteTodo(todo._id));
    setIsVisible(false)
  }

  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <animated.li
              style={{
                backgroundColor: `${color}`,
                padding: "15px",
                margin: "10px",
                listStyle: "none",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                overflow: "hidden",
                ...style,
              }}
              className="list"
              onClick={() => dispatch(toggleTodo(todo._id))}
            >
              <span
                style={{
                  color: "var(--dark)",
                  fontSize: "1.2em",
                  textTransform: "capitalize",
                  cursor: "pointer",
                  position: "relative",
                  padding: "0 5px",
                  userSelect: "none",
                  wordBreak: "break-all",
                  display: `${editing ? "none" : "block"}`,
                }}
                className={todo.done ? "textThrough" : "textNotThrough"}
              >
                {todo.data}
              </span>
              <form
                style={{ display: editing ? "block" : "none" }}
                onSubmit={(e) => handleSubmit(e)}
              >
                <input
                  type="text"
                  value={text}
                  className="edit-todo"
                  onChange={(e) => setText(e.target.value)}
                />
              </form>
              <div className="box">
                <FaPen
                  className="icon edit"
                  onClick={() => setEditing((prevState) => !prevState)}
                />
                <FaTrash
                  className="icon delete"
                  onClick={() => handleDeleteTodo()}
                />
              </div>
            </animated.li>
          )
      )}
    </>
  );
};

export default Todo;
