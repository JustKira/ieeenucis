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
  readonly User?: User;
  issuerId: number;
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
  readonly Opportunity: Opportunity;
  opportunityId: number;
  User: User;
  userId: number;
  approved: Boolean;
};

export type OpportunityTask = {
  readonly id: number;
  Task: Task;
  taskId: number;
  readonly Opportunity: Opportunity;
  opportunityId: number;
};
