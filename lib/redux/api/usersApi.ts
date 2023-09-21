import { quizzyApi } from "./quizzyApi";
import { ApiResponse, Quiz, QuizAnswers, UserQuiz, User } from "@/types";
export const usersApi = quizzyApi.injectEndpoints({
  endpoints: (build) => ({
    getUsersList: build.query<ApiResponse<User[]>, void>({
      query: () => "users/list",
    }),
    getUserQuiz: build.query<ApiResponse<UserQuiz>, string>({
      query: (quizId) => `schedule/user/${quizId}/quiz`,
    }),
    updateUserQuiz: build.mutation<
      void,
      { quizId: number; quizAnswers: QuizAnswers }
    >({
      query: ({ quizAnswers, quizId }) => ({
        url: `schedule/user/${quizId}/quiz`,
        method: "POST",
        body: quizAnswers,
      }),
    }),
  }),
  overrideExisting: false,
});
