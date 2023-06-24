"use client";
import React, { useEffect, useReducer } from "react";
import { Permissions } from "./Permissions-Data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import { ScrollArea } from "../ui/scroll-area";

interface PermissionListerProps {
  loadvalues?: string[] | null;
  onUpdate: (a: string[]) => void;
}

type Action =
  | { type: "ADD_PERMISSION"; permission: string }
  | { type: "REMOVE_PERMISSION"; permission: string }
  | { type: "LOAD_PERMISSIONS"; permissions: string[] };

type State = {
  permissions: string[];
};

const initialState: State = {
  permissions: [],
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_PERMISSION":
      if (!state.permissions.includes(action.permission)) {
        return {
          ...state,
          permissions: [...state.permissions, action.permission],
        };
      }
      return state;
    case "REMOVE_PERMISSION":
      return {
        ...state,
        permissions: state.permissions.filter(
          (permission) => permission !== action.permission
        ),
      };
    case "LOAD_PERMISSIONS":
      return {
        ...state,
        permissions: [...action.permissions],
      };
    default:
      return state;
  }
};

function PermissionLister({ loadvalues, onUpdate }: PermissionListerProps) {
  const Permission = Permissions;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (loadvalues) {
      dispatch({ type: "LOAD_PERMISSIONS", permissions: loadvalues });
    }
  }, [loadvalues]);

  useEffect(() => {
    onUpdate(state.permissions);
  }, [state.permissions]);

  const handlePermission = (permission: string, value: boolean) => {
    if (value) {
      if (!state.permissions.includes(permission)) {
        dispatch({ type: "ADD_PERMISSION", permission });
      }
    } else {
      if (state.permissions.includes(permission)) {
        dispatch({ type: "REMOVE_PERMISSION", permission });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-primary/75">Permissions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <ScrollArea className="h-[400px]">
          <div className="flex flex-col space-y-2">
            {Permission.map((permission, id) => {
              return (
                <div
                  className="flex justify-between gap-4 w-full min-h-[4rem] pr-8"
                  key={id}
                >
                  <div className="flex flex-col">
                    <h1 className="text-sm font-medium">{permission.name}</h1>
                    <p className="text-xs font-light text-primary/50">
                      {permission.description}
                    </p>
                  </div>
                  <Switch
                    checked={state.permissions.includes(permission.permission)}
                    onCheckedChange={(e) =>
                      handlePermission(permission.permission, e)
                    }
                  />
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default PermissionLister;
