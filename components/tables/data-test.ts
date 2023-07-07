export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "9a7e46c1",
    amount: 75,
    status: "success",
    email: "test@example.com",
  },
  {
    id: "3f6d95b8",
    amount: 150,
    status: "pending",
    email: "user123@gmail.com",
  },
  {
    id: "c82f1095",
    amount: 200,
    status: "processing",
    email: "john.doe@example.com",
  },
  {
    id: "e7a28f16",
    amount: 50,
    status: "failed",
    email: "jane.doe@example.com",
  },
];
