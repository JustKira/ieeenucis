import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import supaClientHandler from "@/lib/Supa/SupaClient";
import { Opportunity, Task } from "@/types";
import { convertDateFormat } from "@/lib/helper/dateConverter";

export const opportunitiesSupaApi = createApi({
  reducerPath: "opportunitiesSupaApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Opportunity"],
  endpoints: (builder) => ({
    getOpportunities: builder.query<
      { list: Opportunity[] | null; count: number },
      { page: number; perPage: number }
    >({
      queryFn: async (args) => {
        const { page, perPage } = args;
        const supabase = supaClientHandler;
        const start = perPage * page;
        const end = perPage * page + perPage;
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) {
          return { error: userError };
        }
        const { data, count } = await supabase
          .from("Opportunity")
          .select(
            "*,OpportunityRequest(User!inner(*)),OpportunityTask(Task(*))",
            {
              count: "exact",
            }
          )
          .eq("OpportunityRequest.User.uid", userData.user.id)
          .range(start, end)
          .limit(perPage);
        console.log(data);
        const _data: Opportunity[] | null = data as any;

        return { data: { list: _data, count: count || 0 } };
      },
      providesTags: ["Opportunity"],
    }),
    createOpportunity: builder.mutation<
      any,
      {
        opportunity: Omit<
          Opportunity,
          "id" | "OpportunityRequest" | "OpportunityTask"
        >;
      }
    >({
      queryFn: async (args) => {
        const supabase = supaClientHandler;
        const { opportunity } = args;

        const { data, error } = await supabase
          .from("Opportunity")
          .insert({ ...opportunity })
          .select()
          .single();
        if (error) {
          return { error: error };
        }

        return { data: null };
      },
      invalidatesTags: ["Opportunity"],
    }),
    createOpportunityRequest: builder.mutation<
      any,
      {
        userId: number;
        opportunityId: number;
      }
    >({
      queryFn: async (args) => {
        const supabase = supaClientHandler;
        const { userId, opportunityId } = args;

        const { data, error } = await supabase
          .from("OpportunityRequest")
          .insert({
            userId: userId,
            opportunityId: opportunityId,
          })
          .select()
          .single();
        if (error) {
          return { error: error };
        }

        return { data: null };
      },
      invalidatesTags: ["Opportunity"],
    }),
    deleteOpportunityRequest: builder.mutation<
      any,
      {
        userId: number;
        opportunityId: number;
      }
    >({
      queryFn: async (args) => {
        const supabase = supaClientHandler;
        const { userId, opportunityId } = args;

        const { data, error } = await supabase
          .from("OpportunityRequest")
          .delete()
          .eq("opportunityId", opportunityId)
          .eq("userId", userId);

        if (error) {
          return { error: error };
        }

        return { data: null };
      },
      invalidatesTags: ["Opportunity"],
    }),
    createOpportunityTask: builder.mutation<
      any,
      { task: Omit<Task, "id">; opportunityId: number }
    >({
      queryFn: async (args) => {
        const supabase = supaClientHandler;
        const { task, opportunityId } = args;

        // Create the task and select its data
        const { data: taskData, error: taskError } = await supabase
          .from("Task")
          .insert({ ...task })
          .select("id")
          .single();
        if (taskError) {
          return { error: taskError };
        }

        // Create the OpportunityTask
        const { data, error } = await supabase
          .from("OpportunityTask")
          .insert({ taskId: taskData.id, opportunityId })
          .select()
          .single();
        if (error) {
          return { error };
        }

        return { data: null };
      },
      invalidatesTags: ["Opportunity"],
    }),
    approveApplicants: builder.mutation<
      null,
      {
        userId: number;
        opportunityId: number;
      }
    >({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { error } = await supabase
          .from("OpportunityRequest")
          .update({ approved: true })
          .eq("opportunityId", arg.opportunityId)
          .eq("userId", arg.userId);
        if (error) {
          return { error: error };
        }

        const { data: getOppo, error: getOppoError } = await supabase
          .from("OpportunityTask")
          .select("Task!inner(id)")
          .eq("opportunityId", arg.opportunityId);

        const taskWillBeCreated: [{ taskId: number; userId: number }] =
          getOppo?.map((task) => {
            if (task.Task) {
              return { taskId: task.Task.id, userId: arg.userId };
            }
          }) as any;
        if (taskWillBeCreated) {
          const { error: createOppoTasksError } = await supabase
            .from("UserTask")
            .insert(taskWillBeCreated)
            .eq("opportunityId", arg.opportunityId);
          if (createOppoTasksError) {
            return { error: createOppoTasksError };
          }
        }

        return { data: null as any };
      },
      invalidatesTags: ["Opportunity"],
    }),
  }),
});

export const {
  useGetOpportunitiesQuery,
  useCreateOpportunityMutation,
  useDeleteOpportunityRequestMutation,
  useCreateOpportunityRequestMutation,
  useCreateOpportunityTaskMutation,
} = opportunitiesSupaApi;
