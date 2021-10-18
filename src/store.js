import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
  return {
    type: ADD,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE,
    id,
  };
};

const initialState = {
  toDos: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { toDos: [{ text: action.text, id: Date.now() }, ...state.toDos] };
    case DELETE:
      const filter = state.toDos.filter((i) => i.id !== action.id);
      return { toDos: filter };
    default:
      return state;
  }
};

export const actionCreators = {
  addToDo,
  deleteToDo,
};

const persistConfig = {
  key: "root",
  storage,
};

const newReducer = persistReducer(persistConfig, reducer);

const configStore = () => {
  const store = createStore(newReducer, applyMiddleware(logger));
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configStore;
