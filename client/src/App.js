import React from "react";

// Components
import Header from "./Components/Header";
import TodoForm from "./Components/TodoForm";
import Todos from "./Components/Todos";

const App = () => {
  return (
    <div className="app">
      <Header />
      <TodoForm />
      <Todos />
    </div>
  );
};

export default App;
