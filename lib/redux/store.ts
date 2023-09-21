import { configureStore } from "@reduxjs/toolkit";
import { rolesSupaApi } from "@/lib/redux/api/rolesSupaApi";
import { usersSupaApi } from "@/lib/redux/api/usersSupaApi";
import { tasksSupaApi } from "@/lib/redux/api/tasksSupaApi";
import { opportunitiesSupaApi } from "@/lib/redux/api/opportunitiesSupaApi";
import { opportunitiesApi } from "@/lib/redux/api/opportunitiesApi";
import { tasksApi } from "@/lib/redux/api/tasksApi";
import { quizzyApi } from "./api/quizzyApi";

const store = configureStore({
  reducer: {
    [quizzyApi.reducerPath]: quizzyApi.reducer,
    [rolesSupaApi.reducerPath]: rolesSupaApi.reducer,
    [usersSupaApi.reducerPath]: usersSupaApi.reducer,
    [tasksSupaApi.reducerPath]: tasksSupaApi.reducer,
    [opportunitiesSupaApi.reducerPath]: opportunitiesSupaApi.reducer,
    [opportunitiesApi.reducerPath]: opportunitiesApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer, // Add the tasksApi reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(rolesSupaApi.middleware)
      .concat(usersSupaApi.middleware)
      .concat(tasksSupaApi.middleware)
      .concat(opportunitiesSupaApi.middleware)
      .concat(opportunitiesApi.middleware)
      .concat(tasksApi.middleware)
      .concat(quizzyApi.middleware), // Add the tasksApi middleware here
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
