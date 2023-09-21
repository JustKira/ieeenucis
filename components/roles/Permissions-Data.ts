export type Permission = {
  name: string;
  description: string;
  permission: string;
};

export const Permissions: Permission[] = [
  {
    name: "Admin",
    permission: "*",
    description: "Admin permission which bypasses all restrictions",
  },
  {
    name: "Default Task Access",
    permission: "default_task",
    description: "Allows users to view and read their own tasks",
  },
  {
    name: "Admin Task Access",
    permission: "admin_task",
    description: "Allows users to view and read all tasks",
  },
  {
    name: "Admin Scoring",
    permission: "admin_scoring",
    description: "Allows users to assign and revoke scores for other users",
  },
  {
    name: "Admin Kaggle",
    permission: "admin_kaggle",
    description:
      "Allows users to create Kaggle data for analysis or machine learning",
  },
  {
    name: "Admin Opportunity Access",
    permission: "admin_opportunity",
    description:
      "Allows users to create opportunities such as job postings or project listings",
  },
  {
    name: "Default Opportunity Access",
    permission: "default_opportunity",
    description: "Allows users to view and read opportunities",
  },
  {
    name: "Senior calendar",
    permission: "senior_calendar",
    description: "Allows seniors to see a special calendar",
  },
  {
    name: "Quiz Access",
    permission: "default_quiz",
    description: "Give User permissions to basics of quiz page "
  },
  {
    name: "Quiz Access Admin",
    permission: "admin_quiz",
    description: "Give Admin permissions to all of quiz page "
  }
];
