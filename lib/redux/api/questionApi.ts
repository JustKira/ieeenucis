import { quizzyApi } from "./quizzyApi";
import { ApiResponse, Quiz, Question, UserQuiz, User } from "@/types";
export const questionApi = quizzyApi.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query<
      ApiResponse<{ id: number; questionObject: Question }[]>,
      number
    >({
      query: (id) => ({
        url: `collections/${id}/questions`,
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
    }),
    addQuestion: build.mutation<void, { id: number; data: Question }>({
      query: ({ id, data }) => ({
        url: `collections/${id}/questions`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});
