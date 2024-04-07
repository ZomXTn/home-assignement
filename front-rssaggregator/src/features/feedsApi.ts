import { apiSlice } from "../slices/apiSlice";
import { IArticle, IFeed } from "../types/entities";
import { IPaginated } from "../types/types";

interface IPaginatedFeeds extends IPaginated<IFeed> {}

const feedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeeds: builder.query<IPaginatedFeeds, string>({
      query: (params) => ({
        url: `/api/feeds?${params}`,
        method: "GET",
      }),
    }),
    getFeedsNoPagination: builder.query<IFeed[], void>({
      query: () => ({
        url: `/api/feeds/`,
        method: "GET",
      }),
    }),
    getFeed: builder.query<IFeed, string>({
      query: (id) => ({
        url: `/api/feeds/${id}/`,
        method: "GET",
      }),
    }),
    createFeed: builder.mutation<IFeed, Partial<IFeed>>({
      query: (feed) => ({
        url: `/api/feeds/`,
        method: "POST",
        body: feed,
      }),
    }),
    updateFeed: builder.mutation<IFeed, Partial<IFeed>>({
      query: ({ feed_id, ...feed }) => ({
        url: `/api/feeds/${feed_id}/`,
        method: "put",
        body: feed,
      }),
    }),
    deleteFeed: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/feeds/${id}/`,
        method: "DELETE",
      }),
    }),
    unsubscribeFromFeed: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/feeds/${id}/unsubscribe`,
        method: "POST",
      }),
    }),
  }),
});

const enhancedApi = feedApi.enhanceEndpoints({
  addTagTypes: ["modification_feeds"],
  endpoints: {
    getFeeds: {
      providesTags: ["modification_feeds"],
    },
    getFeedsNoPagination: {
      providesTags: ["modification_feeds"],
    },
    getFeed: {
      providesTags: ["modification_feeds"],
    },
    createFeed: {
      invalidatesTags: ["modification_feeds"],
    },
    updateFeed: {
      invalidatesTags: ["modification_feeds"],
    },
    deleteFeed: {
      invalidatesTags: ["modification_feeds"],
    },
    unsubscribeFromFeed: {
      invalidatesTags: ["modification_feeds"],
    },
  },
});

export const {
  useGetFeedsQuery,
  useCreateFeedMutation,
  useDeleteFeedMutation,
  useUpdateFeedMutation,
  useGetFeedQuery,
  useGetFeedsNoPaginationQuery,
  useUnsubscribeFromFeedMutation
} = feedApi;
