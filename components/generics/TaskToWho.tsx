import { useGetAssignedToTaskQuery } from "@/lib/redux/api/tasksSupaApi";
import React from "react";

const TaskToWho = ({ taskId }: { taskId: number }) => {
  const { isLoading, data, isError } = useGetAssignedToTaskQuery({
    taskId: taskId,
  });
  return (
    <>
      {data?.list?.map((user, id) => (
        <div>
          {user?.firstname} {user?.lastname}
        </div>
      ))}
    </>
  );
};

export default TaskToWho;
