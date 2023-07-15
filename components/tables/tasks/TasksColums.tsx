import { ColumnDef } from "@tanstack/react-table";
import { Payment } from "../data-test";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task, UserTask } from "@/types";
import Link from "next/link";
import { convertTime } from "@/lib/helper/dateConverter";
export const TasksColums: ColumnDef<{
  id?: number;
  approved: boolean;
  finished: boolean;
  Task: Partial<Task>;
}>[] = [
  {
    accessorKey: "Task.title",
    header: "Title",
  },
  {
    accessorKey: "Task.dueDate",
    header: "DueDate",
    cell: ({ getValue }) => {
      const data = getValue() as string | null;
      return <>{data ? <>{convertTime(data)}</> : <></>}</>;
    },
  },
  {
    accessorKey: "finished",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Finished
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "approved",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Approved
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Link href={`/dashboard/tasks/${data.id}`}>
          <Button variant={"outline"}>View</Button>
        </Link>
      );
    },
  },
];
