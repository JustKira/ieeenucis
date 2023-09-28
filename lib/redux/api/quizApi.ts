import { quizzyApi } from "./quizzyApi";
import {
  ApiResponse,
  Quiz,
  QuizSchedule,
  UserQuiz,
  QuizQuestion,
  QuizAnswer,
} from "@/types";
export const quizApi = quizzyApi.injectEndpoints({
  endpoints: (build) => ({
    getQuizzes: build.query<ApiResponse<Quiz[]>, void>({
      query: () => "quiz",
    }),
    getSchedules: build.query<ApiResponse<QuizSchedule[]>, void>({
      query: () => "schedule",
    }),
    addQuiz: build.mutation<
      void,
      { quizName: string; totalMarks: number; questionsIds: number[] }
    >({
      query: (body) => ({
        url: `quiz`,
        method: "POST",
        body: body,
      }),
    }),
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
      invalidatesTags: ["user-quiz"],
    }),
    userQuiz: build.query<ApiResponse<UserQuiz[]>, void>({
      query: () => "schedule/user",
      providesTags: ["user-quiz"],
    }),
    attendQuiz: build.mutation<void, string>({
      query: (quizId) => ({
        url: `schedule/user/${quizId}/quiz/attend`,
        method: "POST",
      }),
    }),
    submitQuiz: build.mutation<
      void,
      { body: QuizAnswer; userQuizId: number; quizId: number }
    >({
      query: ({ body, quizId, userQuizId }) => ({
        url: `schedule/user/${userQuizId}/quiz/submit?quizId=${quizId}`,
        method: "POST",
        body: { ...body },
      }),
    }),
    getQuizQuestions: build.query<ApiResponse<QuizQuestion[]>, number>({
      query: (id) => `quiz/${id}/questions`,
    }),
  }),
  overrideExisting: false,
});
