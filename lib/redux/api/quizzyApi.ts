import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizzyApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api/quizzy" }),
  endpoints: () => ({}),
});
