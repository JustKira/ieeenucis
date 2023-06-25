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
