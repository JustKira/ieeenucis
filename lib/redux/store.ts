import { configureStore } from "@reduxjs/toolkit";
import { rolesSupaApi } from "@/lib/redux/api/rolesSupaApi";
import { usersSupaApi } from "@/lib/redux/api/usersSupaApi";
import { tasksSupaApi } from "@/lib/redux/api/tasksSupaApi";
import { opportunitiesSupaApi } from "@/lib/redux/api/opportunitiesSupaApi";
import { tasksApi } from "@/lib/redux/api/tasksApi";

const store = configureStore({
  reducer: {
    [rolesSupaApi.reducerPath]: rolesSupaApi.reducer,
    [usersSupaApi.reducerPath]: usersSupaApi.reducer,
    [tasksSupaApi.reducerPath]: tasksSupaApi.reducer,
    [opportunitiesSupaApi.reducerPath]: opportunitiesSupaApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer, // Add the tasksApi reducer here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(rolesSupaApi.middleware)
      .concat(usersSupaApi.middleware)
      .concat(tasksSupaApi.middleware)
      .concat(opportunitiesSupaApi.middleware)
      .concat(tasksApi.middleware), // Add the tasksApi middleware here
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
