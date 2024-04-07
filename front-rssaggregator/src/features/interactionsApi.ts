import { apiSlice } from "../slices/apiSlice"
import { IInteraction } from "../types/entities"
import { IPaginated, PaginationProps } from "../types/types"

const formatUrl = (url: string, id: string) => `/api/articles/${id}/interactions/${url}`

interface InteractionPaginationProps extends PaginationProps { }
interface IPaginatedInteractions extends IPaginated<IInteraction> { }

const interactionsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        rateArticle: builder.mutation<void, { articleId: string, rating: number }>({
            query: ({ articleId, rating }) => ({
                url: formatUrl("rate/", articleId),
                method: "POST",
                body: { rating }
            }),
        }),
        favoriteArticle: builder.mutation<void, { articleId: string }>({
            query: ({ articleId }) => ({
                url: formatUrl("favorite/", articleId),
                method: "POST",
            }),
        }),
        shareArticle: builder.mutation<void, { articleId: string, share: string }>({
            query: ({ articleId, share }) => ({
                url: formatUrl("share/", articleId),
                method: "POST",
                body: { share }
            }),
        }),
        opinionArticle: builder.mutation<void, { articleId: string, opinion: string }>({
            query: ({ articleId, opinion }) => ({
                url: formatUrl("opinion/", articleId),
                method: "POST",
                body: { opinion }
            }),
        }),
        readArticle: builder.mutation<IInteraction, { id: string, duration: number }>({
            query: ({ id, duration }) => ({
                url: formatUrl("read_article/", id),
                method: "POST",
                body: { duration }
            }),
        }),
        getHistory: builder.query<IPaginatedInteractions, string>({
            query: (queries) => ({
                url: `/api/history?${queries}`,
                method: "GET",
            }),
        }),
    })
})
const enhancedApi = apiSlice.enhanceEndpoints({
    endpoints: {
        rateArticle: {
            invalidatesTags: ["modification_articles"]
        },
        favoriteArticle: {
            invalidatesTags: ["modification_articles"]
        },
        shareArticle: {
            invalidatesTags: ["modification_articles"]
        },
        opinionArticle: {
            invalidatesTags: ["modification_articles"]
        },
    }

})
// const enhancedInteractionsApi = apiSlice.enhanceEndpoints({
//     addTagTypes: ["new_interaction"],
//     endpoints: {
//         favoriteArticle: {
//             invalidatesTags: ["new_interaction"]
//         },
//         rateArticle: {
//             invalidatesTags: ["new_interaction"]
//         },
//         shareArticle: {
//             invalidatesTags: ["new_interaction"]
//         },
//         getHistory: {
//             providesTags: ["new_interaction"]
//         },
//         getArticles: {
//             provideTags: ["new_interaction"]
//         }
//     }
// })
// TODO

export const { useRateArticleMutation, useFavoriteArticleMutation, useShareArticleMutation, useGetHistoryQuery, useOpinionArticleMutation , useReadArticleMutation} = interactionsApi