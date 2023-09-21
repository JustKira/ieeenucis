import { quizzyApi } from "./quizzyApi";
import {
  ApiResponse,
  Quiz,
  QuizSchedule,
  UserQuiz,
  QuizQuestion,
} from "@/types";
export const quizApi = quizzyApi.injectEndpoints({
  endpoints: (build) => ({
    getQuizzes: build.query<ApiResponse<Quiz[]>, void>({
      query: () => "quiz",
    }),
    getSchedules: build.query<ApiResponse<QuizSchedule[]>, void>({
      query: () => "schedule",
    }),
    addQuiz: build.mutation<void, { quizName: string; questionsIds: number[] }>(
      {
        query: (body) => ({
          url: `quiz`,
          method: "POST",
          body: body,
        }),
      }
    ),
    createQuizSchedule: build.mutation<
      ApiResponse<QuizSchedule>,
      Omit<QuizSchedule, "id" | "code">
    >({
      query: (body) => ({
        url: `schedule`,
        method: "POST",
        body: body,
      }),
    }),
    assignQuizSchedule: build.mutation<ApiResponse<QuizSchedule>, string>({
      query: (code) => ({
        url: `schedule/${code}/user`,
        method: "POST",
      }),
    }),
    userQuiz: build.query<ApiResponse<UserQuiz[]>, void>({
      query: () => "schedule/user",
    }),
    attendQuiz: build.mutation<void, string>({
      query: (quizId) => ({
        url: `schedule/user/${quizId}/quiz/attend`,
        method: "POST",
      }),
    }),
    getQuizQuestions: build.query<ApiResponse<QuizQuestion[]>, number>({
      query: (id) => `quiz/${id}/questions`,
    }),
  }),
  overrideExisting: false,
});
