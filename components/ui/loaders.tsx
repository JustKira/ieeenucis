import { Loader2 } from "lucide-react";

export const LoadWrapper = ({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center flex-grow w-full h-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export const QuickLoader = ({ loading }: { loading: boolean }) => {
  if (loading) {
    return <Loader2 className="animate-spin" />;
  }

  return <></>;
};
