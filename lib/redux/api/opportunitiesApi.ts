import { DefaultRequest, Task, User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const opportunitiesApi = createApi({
  reducerPath: "opportunitiesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    approveOpportunity: builder.mutation<
      DefaultRequest<{
        id: number;
        approved: boolean;
        finished: boolean;
        Task: Partial<Task>;
      }>,
      { uid: string | number; orid: string | number }
    >({
      query: ({ uid, orid }) => `opportunities/${uid}?orid=${orid}`,
    }),
  }),
});

export const { useApproveOpportunityMutation } = opportunitiesApi;
