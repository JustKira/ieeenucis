import { quizzyApi } from "./quizzyApi";
import { ApiResponse, Quiz, Question, UserQuiz, User } from "@/types";
export const questionApi = quizzyApi.injectEndpoints({
  endpoints: (build) => ({
    getQuestions: build.query<
      ApiResponse<{ id: number; questionObject: Question }[]>,
      { id: number; page?: number }
    >({
      query: ({ id, page }) => ({
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
      providesTags: ["questions"],
    }),
    addQuestion: build.mutation<void, { id: number; data: Question }>({
      query: ({ id, data }) => ({
        url: `collections/${id}/questions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["questions"],
    }),
    removeQuestion: build.mutation<void, { id: number; qid: number }>({
      query: ({ id, qid }) => ({
        url: `collections/${id}/questions?qid=${qid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["questions"],
    }),
  }),
  overrideExisting: false,
});
