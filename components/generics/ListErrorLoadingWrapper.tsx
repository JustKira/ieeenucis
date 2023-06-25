import { PostgrestError } from "@supabase/supabase-js";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";
import { QuickLoader } from "../ui/loaders";

interface ListErrorLoadingWrapperProps {
  isError: boolean;
  error?: PostgrestError;
  isLoading: boolean;
  skeleton?: JSX.Element;
  children: React.ReactNode;
}

const ListErrorLoadingWrapper = ({
  children,
  isError,
  isLoading,
  error,
  skeleton,
}: ListErrorLoadingWrapperProps) => {
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
  if (isLoading) {
    if (!skeleton) {
      return (
        <div className="h-full w-full items-center justify-center">
          <QuickLoader loading />
        </div>
      );
    }
  }
  return <>{children}</>;
};

export default ListErrorLoadingWrapper;
