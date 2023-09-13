"use client";

import { useRouter } from "next/navigation";
import { useGetUserPermissionsQuery } from "../redux/api/rolesSupaApi";

export default function usePermission() {
  const {
    data: userPermission,
    isLoading,
    error,
  } = useGetUserPermissionsQuery();
  const { push } = useRouter();

  const checkPermission = (
    permissions: string[],
    allowedComponent: JSX.Element,
    deniedComponent?: JSX.Element,
    redirect?: boolean,
    redirectTo?: string
  ) => {
    permissions.push("*");

    const hasPermission = userPermission?.some((permission) =>
      permissions.includes(permission)
    );

    if (hasPermission) {
      return <>{allowedComponent}</>;
    } else {
      if (redirect) {
        push(redirectTo || "/404");
        return <></>;
      }
      if (deniedComponent) {
        return <>{deniedComponent}</>;
      }
      return <></>;
    }
  };

  const checkPermissionNonJSX = (permissions: string[], toRun: () => void) => {
    permissions.push("*");

    const hasPermission = userPermission?.some((permission) =>
      permissions.includes(permission)
    );

    if (hasPermission) {
      toRun();
    }
    {
      return;
    }
  };

  return { isLoading, checkPermission, checkPermissionNonJSX };
}
