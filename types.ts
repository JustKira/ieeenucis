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
  readonly issuer: User;
  issuerId: number;
};
