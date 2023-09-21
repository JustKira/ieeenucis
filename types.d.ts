import { PostgrestError } from "@supabase/supabase-js";
import { type } from "os";
type Week = {
  weektitle: string;
  days: string[][];
};
type Role = {
  readonly id: number;
  name: string;
  permissions: string[] | null;
};
type User = {
  readonly id: number;
  uid: string;
  email: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  score: number;
};
type UserRole = {
  readonly id: number;
  User: User | null;
  Role: Role | null;
};
type UserTask = {
  readonly id: number;
  approved: boolean;
  finished: boolean;
  taskId: number;
  userId: number;

  Task?: Task | null;
  User?: User | null;
};
type Task = {
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
type ScoreHistory = {
  ammount: number;
  date: string;
  id: number;
  issuerId: number | null;
  reason: string | null;
  receiverId: number;
  readonly User?: User | null;
};
type Opportunity = {
  readonly id: number;
  title: string;
  description: string;
  deadline: string;
  readonly OpportunityTask?: OpportunityTask[] | null;
  readonly OpportunityRequest?: OpportunityRequest[] | null;
};
type OpportunityRequest = {
  readonly id: number;
  readonly Opportunity?: Opportunity | null;
  opportunityId: number;
  readonly User?: User | null;
  userId: number;
  approved: boolean;
};
type OpportunityTask = {
  readonly id: number;
  Task: Task;
  taskId: number;
  readonly Opportunity: Opportunity;
  opportunityId: number;
};
interface Submission {
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

type ApiResponse<T> = {
  data: T;
  error: any;
  status: number;
  statusText: string;
  count?: number;
};

type Collection = {
  readonly id: number;
  collectionName: string;
};

interface Choice {
  choice: string;
  isAnswer: boolean;
}

interface MCQQuestion {
  type: "MCQ";
  choices: Choice[];
}

interface MultiQuestion {
  type: "MULTI";
  choices: Choice[];
}

interface MCQQuestionNoAnswer {
  type: "MCQ";
  choices: Omit<Choice, "isAnswer">[];
}

interface MultiQuestionNoAnswer {
  type: "MULTI";
  choices: Omit<Choice, "isAnswer">[];
}

interface MCQQuestion {
  type: "MULTI";
  choices: Choice[];
}

interface TFQuestion {
  type: "TF";
  isAnswer: boolean;
}

interface TextQuestion {
  type: "TEXT";
  format: string;
}
type QuestionTypes = MCQQuestion | TFQuestion | TextQuestion | MultiQuestion;
type QuestionTypesNoAnswer =
  | TextQuestion
  | MultiQuestionNoAnswer
  | MCQQuestionNoAnswer
  | Omit<TFQuestion, "isAnswer">;
type Question = {
  question: string;
  score: number;
  object: QuestionTypes;
};
type QuestionNoAnswer = {
  question: string;
  score: number;
  object: QuestionTypesNoAnswer;
};

type Quiz = {
  id: number;
  quizName: string;
};

type QuizQuestion = {
  id: number;
  quizId: number;
  questionId: number;
  Quiz?: Quiz;
  Question?: { questionObject: Question };
};
type User = {
  id: number;
  uid: string;
  email: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  score: number;
};

type QuizSchedule = {
  readonly id: number;
  name: string;
  code: string;
  duration: number;
  quizId: number;
  startDate: string;
};

type UserQuiz = {
  answers: Json;
  attended: boolean;
  autoGrade: number;
  id: number;
  manualGrade: number;
  Quiz?: Partial<Quiz>;
  quizScheduleId: number;
  QuizSchedule: Partial<QuizSchedule>;
  attendedAt: string;
  userId: number;
  quizId: number;
};

type MCQAnswer = {
  type?: "MCQ";
  id?: number;
  answer?: number;
};

type MULTIAnswer = {
  type?: "MULTI";
  id?: number;
  answers?: number[];
};

type TFAnswer = {
  type?: "TF";
  id?: number;
  answer?: boolean;
};

type TEXTAnswer = {
  type?: "TEXT";
  id?: number;
  answer?: string;
};

type QuizAnswers = MCQAnswer | TFAnswer | MULTIAnswer | TEXTAnswer;

type ApiResponse<T> = {
  data: T;
  error: any;
  status: number;
  statusText: string;
  count?: number;
};

type Collection = {
  readonly id: number;
  collectionName: string;
};

interface Choice {
  choice: string;
  isAnswer: boolean;
}

interface MCQQuestion {
  type: "MCQ";
  choices: Choice[];
}

interface MultiQuestion {
  type: "MULTI";
  choices: Choice[];
}

interface MCQQuestionNoAnswer {
  type: "MCQ";
  choices: Omit<Choice, "isAnswer">[];
}

interface MultiQuestionNoAnswer {
  type: "MULTI";
  choices: Omit<Choice, "isAnswer">[];
}

interface MCQQuestion {
  type: "MULTI";
  choices: Choice[];
}

interface TFQuestion {
  type: "TF";
  isAnswer: boolean;
}

interface TextQuestion {
  type: "TEXT";
  format: string;
}
type QuestionTypes = MCQQuestion | TFQuestion | TextQuestion | MultiQuestion;
type QuestionTypesNoAnswer =
  | TextQuestion
  | MultiQuestionNoAnswer
  | MCQQuestionNoAnswer
  | Omit<TFQuestion, "isAnswer">;
type Question = {
  question: string;
  score: number;
  object: QuestionTypes;
};
type QuestionNoAnswer = {
  question: string;
  score: number;
  object: QuestionTypesNoAnswer;
};

type Quiz = {
  id: number;
  quizName: string;
};

type QuizQuestion = {
  id: number;
  quizId: number;
  questionId: number;
  Quiz?: Quiz;
  Question?: { questionObject: Question };
};
type User = {
  id: number;
  uid: string;
  email: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  score: number;
};

type QuizSchedule = {
  readonly id: number;
  name: string;
  code: string;
  duration: number;
  quizId: number;
  startDate: string;
};

type UserQuiz = {
  answers: Json;
  attended: boolean;
  autoGrade: number;
  id: number;
  manualGrade: number;
  Quiz?: Partial<Quiz>;
  quizScheduleId: number;
  QuizSchedule: Partial<QuizSchedule>;
  attendedAt: string;
  userId: number;
  quizId: number;
};

type MCQAnswer = {
  type?: "MCQ";
  id?: number;
  answer?: number;
};

type MULTIAnswer = {
  type?: "MULTI";
  id?: number;
  answers?: number[];
};

type TFAnswer = {
  type?: "TF";
  id?: number;
  answer?: boolean;
};

type TEXTAnswer = {
  type?: "TEXT";
  id?: number;
  answer?: string;
};

type QuizAnswers = MCQAnswer | TFAnswer | MULTIAnswer | TEXTAnswer;
