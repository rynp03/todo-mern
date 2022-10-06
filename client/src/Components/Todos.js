import React, { useEffect } from "react";
import { deleteTodo, getAllTodos } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo";
import Tabs from "./Tabs";
import { ALL_TODOS, DONE_TODOS, ACTIVE_TODOS } from "../redux/actions/type";

const Todos = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);
  const currentTab = useSelector((state) => state.currentTab);

  useEffect(() => {
    dispatch(getAllTodos());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTodos = () => {
    if (currentTab === ALL_TODOS) {
      return todos;
    } else if (currentTab === ACTIVE_TODOS) {
      return todos.filter((todo) => !todo.done);
    } else if (currentTab === DONE_TODOS) {
      return todos.filter((todo) => todo.done);
    }
  };

  const deleteDoneTodos = () => {
    todos.forEach(({ done, _id }) => {
      if (done) {
        dispatch(deleteTodo(_id));
      }
    });
  };

  return (
    <article>
      <div style={{ display: "flex", gap: "10px", margin: "15px 0" }} className="todos">
        <Tabs currentTab={currentTab} />

        {todos.some((todo) => todo.done) ? (
          <button onClick={() => deleteDoneTodos()} className="btn btn-delete">
            Delete Done Todos
          </button>
        ) : null}
      </div>
      <ul>
        {getTodos().map((todo) => (
          <Todo todo={todo} key={todo._id} />
        ))}
      </ul>
    </article>
  );
};

export default Todos;
