import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import supaClientHandler from "@/lib/Supa/SupaClient";
import { Task, UserTask } from "@/types";
import { convertDateFormat } from "@/lib/helper/dateConverter";

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
  tagTypes: ["UserTask"],
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

        return { data: { list: _data, count: count || 0 } };
      },
      providesTags: ["UserTask"],
    }),
    getAllUsertasks: builder.query<
      { list: UserTask[] | null; count: number },
      { page: number; perPage: number; approved: boolean; finished: boolean }
    >({
      queryFn: async (args) => {
        const { perPage, page, approved, finished } = args;
        const supabase = supaClientHandler;
        const start = perPage * page;
        const end = perPage * page + perPage;

        const { data, count } = await supabase
          .from("UserTask")
          .select("*,Task(*,User(*)),User(*)", { count: "exact" })
          .eq("approved", approved)
          .eq("finished", finished)
          .range(start, end)
          .limit(perPage);
        const _data: UserTask[] | null = data as any;

        return { data: { list: _data, count: count || 0 } };
      },
      providesTags: ["UserTask"],
    }),
    getTasks: builder.query<
      { list: Task[] | null; count: number },
      { page: number; perPage: number; search?: string | null }
    >({
      queryFn: async (args) => {
        const { perPage, page, search } = args;
        const supabase = supaClientHandler;
        const start = perPage * page;
        const end = perPage * page + perPage;

        if (search) {
          const { data, count } = await supabase
            .from("Task")
            .select("*", { count: "exact" })
            .textSearch("title", search, { type: "plain" })
            .range(start, end)
            .limit(perPage);
          const _data: Task[] | null = data as any;

          return { data: { list: _data, count: count || 0 } };
        } else {
          const { data, count } = await supabase
            .from("Task")
            .select("*", { count: "exact" })
            .range(start, end)
            .limit(perPage);
          const _data: Task[] | null = data as any;

          return { data: { list: _data, count: count || 0 } };
        }
      },
      providesTags: ["UserTask"],
    }),
    updateTask: builder.mutation<
      any,
      { taskId: number; updatedTask: Partial<Task> }
    >({
      queryFn: async (args) => {
        const supabase = supaClientHandler;
        const { taskId, updatedTask } = args;

        // Update the task with the provided taskId
        const { data, error } = await supabase
          .from("Task")
          .update(updatedTask)
          .eq("id", taskId);

        if (error) {
          return { error: error };
        }

        return { data: null };
      },
      invalidatesTags: ["UserTask"],
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
    taskStatusUpdate: builder.mutation<
      any,
      { status: boolean; taskId: number }
    >({
      queryFn: async (args) => {
        const supabase = supaClientHandler;
        const { status, taskId } = args;

        // Update the UserTask with the provided status
        const { error } = await supabase
          .from("UserTask")
          .update({ finished: status })
          .eq("id", taskId);

        if (error) {
          return { error: error };
        }

        return { data: null };
      },
      invalidatesTags: ["UserTask"],
    }),
    approveTaskFunc: builder.mutation<
      null,
      {
        state: boolean;
        points: number;
        id: number;
        approverId: number;
        receiverId: number;
      }
    >({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        if (arg.state === false) {
          const { data, error } = await supabase
            .from("UserTask")
            .update({ finished: false })
            .eq("id", arg.id);
          if (error) {
            return { error: error };
          }
          return { data: null };
        }

        const { data, error, statusText } = await supabase
          .from("UserTask")
          .update({ approved: true })
          .eq("id", arg.id);

        if (error) {
          return { error: error };
        }
        const { error: incrementError } = await supabase.rpc("increment", {
          x: arg.points,
          row_id: arg.receiverId,
        });
        if (incrementError) {
          return { error: incrementError };
        }

        const { error: scoreHistoryError } = await supabase
          .from("ScoreHistory")
          .insert({
            ammount: arg.points,
            date: convertDateFormat(Date.now()),
            reason: `System has added ${arg.points} points to your account for the approved task. `,
            receiverId: arg.receiverId,
            issuerId: arg.approverId,
          });
        if (scoreHistoryError) {
          return { error: scoreHistoryError };
        }
        return { data: null };
      },
      invalidatesTags: ["UserTask"],
    }),
  }),
});
export const {
  useGetAllUsertasksQuery,
  useApproveTaskFuncMutation,
  useCreateTaskMutation,
  useGetUsertasksQuery,
  useGetTasksQuery,
  useTaskStatusUpdateMutation,
  useUpdateTaskMutation,
} = tasksSupaApi;
