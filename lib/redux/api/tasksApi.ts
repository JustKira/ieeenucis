import { DefaultRequest, Task, User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getUserTaskById: builder.query<
      DefaultRequest<{
        id: number;
        approved: boolean;
        finished: boolean;
        Task: Partial<Task>;
      }>,
      { uid: string; id: string }
    >({
      query: ({ uid, id }) => `utasks/${uid}?id=${id}`,
    }),
    getUserTasks: builder.query<
      DefaultRequest<
        {
          id: number;
          approved: boolean;
          finished: boolean;
          User: Partial<User>;
          Task: Partial<Task>;
        }[]
      >,
      {
        uid: string;
        skip: number | null;
        search?: string | null;
        limit?: number | null;
        pastdue?: boolean;
        finished?: boolean;
        approved?: boolean;
      }
    >({
      query: ({ uid, skip, search, limit, pastdue, finished, approved }) =>
        `utasks/${uid}/info?limit=${limit ? limit : 8}&skip=${skip || 0}${
          search ? `&search=${search}` : ""
        } ${finished ? `&finished=${finished}` : ""} ${
          approved ? `&approved=${approved}` : ""
        } ${pastdue ? `&pastdue=${pastdue}` : ""}`,
    }),
  }),
});

export const { useGetUserTasksQuery, useGetUserTaskByIdQuery } = tasksApi;
