import GenericUserTaskList from "@/components/generics/GenericUserTaskList";
import React, { useState } from "react";

function ViewTask() {
  const [tasks, setTasks] = useState<number[]>([]);
  return (
    <div>
      <GenericUserTaskList
        per={8}
        multipleSelection={tasks}
        multiple
        onClick={(task) => {
          if (tasks.includes(task.id)) {
            const newTasks = tasks.filter((id) => id !== task.id);
            setTasks(newTasks);
          } else {
            setTasks([...tasks, task.id]);
          }
        }}
      />
    </div>
  );
}

export default ViewTask;
