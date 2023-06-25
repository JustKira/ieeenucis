import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import supaClientHandler from "@/lib/Supa/SupaClient";
import { Task, UserTask } from "@/types";

function mergeArraysWithoutDuplicates(
  arr1: number[],
  arr2: number[]
): number[] {
  const mergedArray = [...arr1, ...arr2];
  const uniqueArray = Array.from(new Set(mergedArray));
  return uniqueArray;
}

export const tasksSupaApi = createApi({
  reducerPath: "tasksSupaApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUsertasks: builder.query<
      { list: Omit<UserTask, "User">[] | null; count: number },
      { userId: number; page: number; perPage: number }
    >({
      queryFn: async (args) => {
        const { userId, perPage, page } = args;
        const supabase = supaClientHandler;
        const start = perPage * page;
        const end = perPage * page + perPage;
        const { data, count } = await supabase
          .from("UserTask")
          .select("*,Task(*)", { count: "exact" })
          .eq("userId", userId)
          .range(start, end)
          .limit(perPage);
        const _data: Omit<UserTask, "User">[] | null = data as any;
        console.log(_data);
        return { data: { list: _data, count: count || 0 } };
      },
    }),
    createTask: builder.mutation<
      any,
      {
        task: Omit<Task, "id" | "issuer">;
        usersId: number[];
        rolesId: number[];
      }
    >({
      queryFn: async (args) => {
        const supabase = supaClientHandler;
        const { data, error } = await supabase
          .from("Task")
          .insert({ ...args.task })
          .select()
          .single();
        if (error) {
          return { error: error };
        }
        const { data: usersRoleId, error: usersRoleIdError } = await supabase
          .from("UserRole")
          .select("userId")
          .in("roleId", args.rolesId);
        const userRoleIds: number[] =
          usersRoleId?.map((obj) => obj.userId) || [];

        const ids = mergeArraysWithoutDuplicates(userRoleIds, args.usersId);
        if (usersRoleIdError) {
          return { error: usersRoleIdError };
        }

        const userTaskArray = ids.map((userId) => {
          return { taskId: data.id, userId: userId };
        });

        const { error: userTaskError } = await supabase
          .from("UserTask")
          .insert(userTaskArray);
        if (userTaskError) {
          return { error: userTaskError };
        }

        return { data: null };
      },
    }),
  }),
});
export const { useCreateTaskMutation, useGetUsertasksQuery } = tasksSupaApi;
