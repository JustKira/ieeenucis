import { quizzyApi } from "./quizzyApi";
import { ApiResponse, Collection } from "@/types";
export const collectionApi = quizzyApi.injectEndpoints({
  endpoints: (build) => ({
    getCollection: build.query<ApiResponse<Collection[]>, void>({
      query: () => "collections",
    }),
  }),
  overrideExisting: false,
});
