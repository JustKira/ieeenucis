import { quizzyApi } from "./quizzyApi";
import { ApiResponse, Collection } from "@/types";
export const collectionApi = quizzyApi.injectEndpoints({
  endpoints: (build) => ({
    getCollection: build.query<ApiResponse<Collection[]>, void>({
      query: () => "collections",
      providesTags: ["collection"],
    }),
    createCollection: build.mutation<void, { collectionName: string }>({
      query: (body) => ({
        url: "collections",
        method: "POST",
        body: { ...body },
      }),
      invalidatesTags: ["collection"],
    }),
    removeCollection: build.mutation<void, number>({
      query: (cid) => ({
        url: `collections?cid=${cid}`,
        method: "DELETE",
      }),
      invalidatesTags: ["collection"],
    }),
  }),
  overrideExisting: false,
});
