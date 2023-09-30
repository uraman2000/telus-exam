import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { User } from "./types"

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL // Replace with your API base URL

export const subsciberApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: builder => ({
    getSubscriber: builder.query<User[], string>({
      query: phoneNumber => {
        if (phoneNumber) {
          return `subscriber/${phoneNumber}`
        }
        return "subscriber/"
      },
      transformResponse: (response: Array<User>) =>
        Array.isArray(response) ? response : [response],
    }),
    postSubscriber: builder.mutation<User, Partial<User>>({
      query: subscriber => ({
        url: "subscriber/",
        method: "POST",
        body: subscriber,
      }),
    }),
    patchSubscriber: builder.mutation<User, Partial<User>>({
      query: updatedData => {
        delete updatedData._id
        return {
          url: `subscriber/${updatedData.phoneNumber}`,
          method: "PATCH",
          body: updatedData,
        }
      },
    }),
    deleteSubscriber: builder.mutation<User, Partial<User>>({
      query: updatedData => ({
        url: `subscriber/${updatedData.phoneNumber}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useGetSubscriberQuery,
  usePostSubscriberMutation,
  usePatchSubscriberMutation,
  useDeleteSubscriberMutation,
} = subsciberApi
