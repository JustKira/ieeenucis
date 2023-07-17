import { PostgrestError } from "@supabase/supabase-js";
import { type } from "os";

export type Role = {
  readonly id: number;
  name: string;
  permissions: string[] | null;
};

export type User = {
  readonly id: number;
  uid: string;
  email: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  score: number;
};

export type UserRole = {
  readonly id: number;
  User: User | null;
  Role: Role | null;
};

export type UserTask = {
  readonly id: number;
  approved: boolean;
  finished: boolean;
  taskId: number;
  userId: number;

  Task?: Task | null;
  User?: User | null;
};

export type Task = {
  readonly id: number;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  createdAt: string;
  allowUpload: boolean;
  readonly User?: User;
  issuerId: number;
  dupped: boolean;
};

export type ScoreHistory = {
  ammount: number;
  date: string;
  id: number;
  issuerId: number | null;
  reason: string | null;
  receiverId: number;
  readonly User?: User | null;
};

export type Opportunity = {
  readonly id: number;
  title: string;
  description: string;
  deadline: string;
  readonly OpportunityTask?: OpportunityTask[] | null;
  readonly OpportunityRequest?: OpportunityRequest[] | null;
};

export type OpportunityRequest = {
  readonly id: number;
  readonly Opportunity?: Opportunity | null;
  opportunityId: number;
  readonly User?: User | null;
  userId: number;
  approved: boolean;
};

export type OpportunityTask = {
  readonly id: number;
  Task: Task;
  taskId: number;
  readonly Opportunity: Opportunity;
  opportunityId: number;
};

export interface Submission {
  teamNameNullable: string;
  scoreNullable: string;
  teamId: number;
  teamName: string;
  hasTeamName: boolean;
  submissionDate: string;
  score: string;
  hasScore: boolean;
}

type DefaultRequest<TData> = {
  error: PostgrestError | null;
  data: TData;
  count?: number;
  status: number;
  statusText: string;
};

type Tag = {
  readonly id: number;
  name: string;
  color: string;
};
