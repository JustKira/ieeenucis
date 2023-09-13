import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import supaClientHandler from "@/lib/Supa/SupaClient";
import { Role, ScoreHistory, User } from "@/types";
import { UserRole } from "../../../types";
import { convertDateFormat } from "@/lib/helper/dateConverter";

interface GetUserRequest extends User {
  UserRole: Omit<UserRole, "id" | "user">[];
}

export const usersSupaApi = createApi({
  reducerPath: "usersSupaApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["USERS"],
  endpoints: (builder) => ({
    getSingleUser: builder.query<User, number>({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        if (args === -1) {
          const { data: userData, error: getUserError } =
            await supabase.auth.getUser();
          if (getUserError) {
            return { error: getUserError };
          }
          const { data, error } = await supabase
            .from("User")
            .select("*")
            .eq("uid", userData.user.id)
            .single();
          if (error) {
            return { error: error };
          }
          return { data: data };
        }
        const { data, error } = await supabase
          .from("User")
          .select("*")
          .eq("id", args)
          .single();

        if (error) {
          return { error: error };
        }

        return { data: data };
      },
      providesTags: (result, arg) =>
        result ? [{ type: "USERS", arg }, "USERS"] : ["USERS"],
    }),
    getMultipleUsers: builder.query<
      {
        list: (User & { UserRole: { Role: { id: number } | null }[] })[];
        count: number;
      },
      { page: number; perPage: number }
    >({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { page, perPage } = args;
        const start = perPage * page;
        const end = perPage * page + perPage;
        const { data, count, error } = await supabase
          .from("User")
          .select("*,UserRole(Role(id))", { count: "exact" })
          .order("firstname")
          .order("lastname")
          .range(start, end)
          .limit(args.perPage);

        if (error) {
          return { error };
        }

        return { data: { list: data, count: count || 0 } };
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.list.map(({ id }) => ({ type: "USERS" as const, id })),
              "USERS",
            ]
          : ["USERS"],
    }),

    createUserRole: builder.mutation<
      any,
      { userId: number; addRoleIds: number[]; removeRoleIds: number[] }
    >({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { userId, addRoleIds, removeRoleIds } = args;

        const insertRecords = addRoleIds.map((roleId) => ({
          userId,
          roleId,
        }));

        const removeRecords = removeRoleIds.map((roleId) => ({
          userId,
          roleId,
        }));

        // Insert new roles in bulk
        if (insertRecords.length > 0) {
          const { error: insertError } = await supabase
            .from("UserRole")
            .insert(insertRecords);

          if (insertError) {
            return { error: insertError };
          }
        }

        // Remove existing roles in bulk
        if (removeRecords.length > 0) {
          const { error: removeError } = await supabase
            .from("UserRole")
            .delete()
            .eq("userId", userId)
            .in("roleId", removeRoleIds);

          if (removeError) {
            return { error: removeError };
          }
        }

        return { data: null };
      },
      invalidatesTags: (result, error, args) =>
        result ? [{ type: "USERS", userId: args.userId }, "USERS"] : ["USERS"],
    }),
    editUserScore: builder.mutation<
      any,
      { ammount: number; reason: string; receiver: number; issuer: number }
    >({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { data, error } = await supabase.from("ScoreHistory").insert({
          ammount: args.ammount,
          date: convertDateFormat(Date.now()),
          reason: args.reason,
          receiverId: args.receiver,
          issuerId: args.issuer,
        });

        if (error) {
          return { error: error };
        }
        const { error: incrementError } = await supabase.rpc("increment", {
          x: args.ammount,
          row_id: args.receiver,
        });
        if (incrementError) {
          return { error: incrementError };
        }
        return { data: data };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "USERS", id: arg.receiver },
        "USERS",
      ],
    }),
    getUserScoreHistory: builder.query<
      {
        list: ScoreHistory[];
        count: number;
      } | null,
      { page: number; perPage: number; userId: number }
    >({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { page, perPage, userId } = args;
        const start = perPage * page;
        const end = perPage * page + perPage;

        const { data, error, count } = await supabase
          .from("ScoreHistory")
          .select("*,User!ScoreHistory_issuerId_fkey(*)", { count: "exact" })
          .eq("receiverId", userId)
          .range(start, end)
          .limit(perPage);

        if (error) {
          return { error: error };
        }
        console.log(data);
        // const _data: { ScoreHistory: ScoreHistory | null }[] | null =
        //   data as any;

        return { data: { list: data, count: count || 0 } };
      },
    }),
    getQuickPermission: builder.mutation<
      any,
      { ammount: number; reason: string; receiver: number; issuer: number }
    >({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { data, error } = await supabase.from("ScoreHistory").insert({
          ammount: args.ammount,
          date: convertDateFormat(Date.now()),
          reason: args.reason,
          receiverId: args.receiver,
          issuerId: args.issuer,
        });

        if (error) {
          return { error: error };
        }
        const { error: incrementError } = await supabase.rpc("increment", {
          x: args.ammount,
          row_id: args.receiver,
        });
        if (incrementError) {
          return { error: incrementError };
        }
        return { data: data };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "USERS", id: arg.receiver },
        "USERS",
      ],
    }),
  }),
});
export const {
  useGetMultipleUsersQuery,
  useEditUserScoreMutation,
  useGetSingleUserQuery,
  useCreateUserRoleMutation,
  useGetUserScoreHistoryQuery,
} = usersSupaApi;
