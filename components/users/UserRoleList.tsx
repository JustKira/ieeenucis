import React, { useEffect, useReducer } from "react";
import { PostgrestError } from "@supabase/supabase-js";

import { useGetRolesQuery } from "@/lib/redux/api/rolesSupaApi";
import { LoadWrapper } from "../ui/loaders";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";
import { Switch } from "../ui/switch";

interface RoleListerProps {
  loadValues?: number[] | null;
  selected?: number;
  onUpdate: (added: number[], removed: number[]) => void;
}

type Action =
  | { type: "UPDATE_GETADDED"; role: number }
  | { type: "UPDATE_GETREMOVED"; role: number }
  | { type: "LOAD_ROLES"; roles: number[] };

type State = {
  roles: number[];
  getAdded: number[];
  getRemoved: number[];
};

const initialState: State = {
  roles: [],
  getAdded: [],
  getRemoved: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_GETADDED":
      if (!state.getAdded.includes(action.role)) {
        return {
          ...state,
          getAdded: [...state.getAdded, action.role],
        };
      } else {
        return {
          ...state,
          getAdded: state.getAdded.filter((r) => r !== action.role),
        };
      }

    case "UPDATE_GETREMOVED":
      if (!state.getRemoved.includes(action.role)) {
        return {
          ...state,
          getRemoved: [...state.getRemoved, action.role],
        };
      } else {
        return {
          ...state,
          getRemoved: state.getRemoved.filter((r) => r !== action.role),
        };
      }
    case "LOAD_ROLES":
      return {
        ...state,
        roles: [...action.roles],
        getAdded: [],
        getRemoved: [],
      };
    default:
      return state;
  }
};

function UserRoleList({ loadValues, onUpdate, selected }: RoleListerProps) {
  const {
    data: rolesData,
    isLoading,
    isError,
    error,
  } = useGetRolesQuery({ page: 0, perPage: 100 });
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (loadValues) {
      dispatch({ type: "LOAD_ROLES", roles: loadValues });
    }
  }, [selected]);

  useEffect(() => {
    onUpdate(state.getAdded, state.getRemoved);
  }, [loadValues, state]);

  const handleRole = (role: number) => {
    if (!state.roles.includes(role)) {
      dispatch({ type: "UPDATE_GETADDED", role });
    } else {
      if (state.roles.includes(role)) {
        dispatch({ type: "UPDATE_GETREMOVED", role });
      }
    }
  };

  if (isError) {
    const errorMessage = error as PostgrestError;
    return (
      <Alert>
        <Terminal className="w-4 h-4" />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>{errorMessage.hint}</AlertDescription>
      </Alert>
    );
  }

  return (
    <LoadWrapper loading={isLoading}>
      <div className="flex flex-col space-y-2">
        {rolesData?.list?.map((role) => (
          <div
            className="flex justify-between gap-2 w-full items-center pr-8"
            key={role.id}
          >
            <div className="flex flex-col">
              <h1 className="text-sm font-bold capitalize">{role.name}</h1>
            </div>
            <Switch
              checked={
                state.roles.includes(role.id)
                  ? !state.getRemoved.includes(role.id)
                  : state.getAdded.includes(role.id)
              }
              onCheckedChange={(value) => {
                handleRole(role.id);
              }}
            />
          </div>
        ))}
      </div>
    </LoadWrapper>
  );
}

export default UserRoleList;
