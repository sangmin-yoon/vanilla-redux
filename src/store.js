import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const toDos = createSlice({
  name: "toDosReducer",
  initialState: { toDos: [] },
  reducers: {
    add: (state, action) => {
      state.toDos.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) => {
      const filter = state.toDos.filter((i) => i.id !== action.payload);
      return { toDos: filter };
    },
  },
});

export const { add, remove } = toDos.actions;

const persistConfig = {
  key: "root",
  storage,
};

const newReducer = persistReducer(persistConfig, toDos.reducer);

const configStore = () => {
  const store = configureStore({
    reducer: newReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configStore;
