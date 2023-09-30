import { configureStore } from "@reduxjs/toolkit"
import { subsciberApi } from "./api"
import modalReducer from "./slices/modalSlice"
export const store = configureStore({
  reducer: {
    [subsciberApi.reducerPath]: subsciberApi.reducer,
    modal: modalReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(subsciberApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
