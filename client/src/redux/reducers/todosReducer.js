import * as actiontypes from "../actions/type";

export const todosReducers = (state = [], action) => {
  switch (action.type) {
    case actiontypes.ADDNEW_TODO:
      return [action.payload, ...state];
    case actiontypes.GETALL_TODO:
      return action.payload;
    case actiontypes.TOGGLE_TODO:
      return state.map((todo) =>
        todo._id === action.payload._id ? { ...todo, done: !todo.done } : todo
      );
    case actiontypes.UPDATE_TODO:
      return state.map((todo) =>
        todo._id === action.payload._id
          ? { ...todo, data: action.payload.data }
          : todo
      );
    case actiontypes.DELETE_TODO:
      return state.filter((todo) => todo._id !== action.payload._id);
    default:
      return state;
  }
};
