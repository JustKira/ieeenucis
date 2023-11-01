import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizzyApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/quizzy" }),
  tagTypes: ["collection", "user-quiz", "questions", "analytics", "history"],
  endpoints: () => ({}),
});
