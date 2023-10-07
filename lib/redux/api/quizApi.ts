import { quizzyApi } from "./quizzyApi";
import {
  ApiResponse,
  Quiz,
  QuizSchedule,
  UserQuiz,
  QuizQuestion,
  QuizAnswer,
  QuizAnalytics,
  Question,
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

    getQuizAnalytics: build.query<
      ApiResponse<{ id: number; analytics: QuizAnalytics }>,
      number
    >({
      query: (id) => `analytics?sid=${id}`,
      providesTags: ["analytics"],
    }),
    generateQuizAnalytics: build.mutation<void, number>({
      query: (id) => ({
        url: `analytics?sid=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["analytics"],
    }),
    getQuestions: build.query<
      ApiResponse<{ id: number; questionObject: Question }[]>,
      number
    >({
      query: (id) => ({
        url: `analytics/questions?sid=${id}`,
        method: "GET",
      }),
      transformResponse: (
        response: ApiResponse<
          { Question: { id: number; questionObject: Question } }[]
        >
      ) => {
        let formatedData: { id: number; questionObject: Question }[] =
          response.data.map((question) => question.Question);
        return { ...response, data: formatedData };
      },
      providesTags: ["questions", "analytics"],
    }),
  }),
  overrideExisting: false,
});
