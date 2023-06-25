import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import supaClientHandler from "@/lib/Supa/SupaClient";
import { Role, User } from "@/types";

function getUniquePermissions(roles: Omit<Role, "name">[]): string[] {
  const permissionsSet = new Set<string>();

  roles?.forEach((roleData) => {
    const permissions = roleData.permissions;
    if (permissions && Array.isArray(permissions)) {
      permissions.forEach((permission) => {
        if (permission) {
          permissionsSet.add(permission);
        }
      });
    }
  });

  return Array.from(permissionsSet);
}

export const rolesSupaApi = createApi({
  reducerPath: "rolesSupaApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["ROLES"],
  endpoints: (builder) => ({
    getRole: builder.query<Role, number>({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { data, error } = await supabase
          .from("Role")
          .select("*")
          .eq("id", args)
          .single();

        if (error) {
          return { error: error };
        }

        return { data: data };
      },
      providesTags: (result, arg) =>
        result ? [{ type: "ROLES", arg }, "ROLES"] : ["ROLES"],
    }),
    getRoles: builder.query<Role[], { page: number; perPage: number }>({
      queryFn: async (args, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { page, perPage } = args;
        const start = perPage * page;
        const end = perPage * page + perPage;
        const { data, error } = await supabase
          .from("Role")
          .select("*")
          .range(start, end);
        if (error) {
          return { error: error };
        }

        return { data: data };
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "ROLES" as const, id })),
              "ROLES",
            ]
          : ["ROLES"],
    }),
    createRole: builder.mutation<any, Omit<Role, "id">>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { error } = await supabase.from("Role").insert({ ...arg });

        if (error) {
          return { error: error };
        }

        return { data: undefined };
      },
      invalidatesTags: ["ROLES"],
    }),
    updateRole: builder.mutation<any, { roleId: number; role: Partial<Role> }>({
      queryFn: async ({ roleId, role }, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { error } = await supabase
          .from("Role")
          .update(role)
          .eq("id", roleId);

        if (error) {
          return { error: error };
        }

        return { data: undefined };
      },
      invalidatesTags: (result, error, { roleId }) => [
        { type: "ROLES", id: roleId },
        "ROLES",
      ],
    }),
    deleteRole: builder.mutation<any, number>({
      queryFn: async (roleId, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { error } = await supabase.from("Role").delete().eq("id", roleId);

        if (error) {
          return { error: error };
        }

        return { data: undefined };
      },
      invalidatesTags: (result, error, roleId) => [
        { type: "ROLES", id: roleId },
        "ROLES",
      ],
    }),
    getUserRoles: builder.query<
      { Role: Role | null; User: Pick<User, "uid"> | null }[] | null,
      void
    >({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { data: userData, error: getUserError } =
          await supabase.auth.getUser();
        if (getUserError) {
          return { error: getUserError };
        }
        const { data, error } = await supabase
          .from("UserRole")
          .select("Role!inner(*),User!inner(uid)")
          .eq("users.uid", userData.user.id);
        if (error) {
          return { error: error };
        }
        const rolesData = data;
        return { data: rolesData || [] };
      },
    }),
    getUserPermissions: builder.query<string[], void>({
      queryFn: async (arg, api, extraOptions, baseQuery) => {
        const supabase = supaClientHandler;
        const { data: userData, error: getUserError } =
          await supabase.auth.getUser();
        if (getUserError) {
          return { error: getUserError };
        }
        const { data, error } = await supabase
          .from("User")
          .select("UserRole(Role(permissions))")
          .eq("uid", userData.user.id)
          .single();
        if (error) {
          return { error: error };
        }

        const rolesData: Omit<Role, "name">[] = data.UserRole as any;

        return { data: getUniquePermissions(rolesData) || [] };
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
  useGetUserPermissionsQuery,
} = rolesSupaApi;
