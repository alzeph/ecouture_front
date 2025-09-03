import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "@features/core/slides";

// import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    modals: modalReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
