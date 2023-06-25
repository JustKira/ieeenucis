import { configureStore } from "@reduxjs/toolkit";
import { rolesSupaApi } from "@/lib/redux/api/rolesSupaApi";
import { usersSupaApi } from "@/lib/redux/api/usersSupaApi";
import { tasksSupaApi } from "@/lib/redux/api/tasksSupaApi";
const store = configureStore({
  reducer: {
    [rolesSupaApi.reducerPath]: rolesSupaApi.reducer,
    [usersSupaApi.reducerPath]: usersSupaApi.reducer,
    [tasksSupaApi.reducerPath]: tasksSupaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(rolesSupaApi.middleware)
      .concat(usersSupaApi.middleware)
      .concat(tasksSupaApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
