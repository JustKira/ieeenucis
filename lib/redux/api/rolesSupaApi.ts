import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import supaClientHandler from "@/lib/Supa/SupaClient";
import { Role } from "@/types";

export const rolesSupaApi = createApi({
  reducerPath: "rolesSupaApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getRole: builder.query<Role, number>({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { data, error } = await supabase
          .from("roles")
          .select("*")
          .eq("id", args)
          .single();

        if (error) {
          return { error: error };
        }

        return { data: data };
      },
    }),
    getRoles: builder.query<Role[], { page: number; perPage: number }>({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { page, perPage } = args;
        const start = perPage * page;
        const end = perPage * page + perPage;
        const { data, error } = await supabase
          .from("roles")
          .select("*")
          .range(start, end);
        if (error) {
          return { error: error };
        }

        return { data: data };
      },
    }),
    createRole: builder.mutation<any, Role>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { error } = await supabase.from("roles").insert({ ...arg });

        if (error) {
          return { error: error };
        }

        return { data: undefined };
      },
    }),
    updateRole: builder.mutation<any, { roleId: number; role: Partial<Role> }>({
      queryFn: async ({ roleId, role }, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { error } = await supabase
          .from("roles")
          .update(role)
          .eq("id", roleId);

        if (error) {
          return { error: error };
        }

        return { data: undefined };
      },
    }),
    deleteRole: builder.mutation<any, number>({
      queryFn: async (roleId, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { error } = await supabase
          .from("roles")
          .delete()
          .eq("id", roleId);

        if (error) {
          return { error: error };
        }

        return { data: undefined };
      },
    }),
  }),
});

export const {
  useGetRoleQuery,
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = rolesSupaApi;
