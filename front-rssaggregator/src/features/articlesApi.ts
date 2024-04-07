import { apiSlice } from "../slices/apiSlice"
import { IArticle, ICategory } from "../types/entities";
import { IPaginated } from "../types/types";

const formatUrl = (url: string) => `/api/articles/${url}`

interface IPaginatedArticles extends IPaginated<IArticle> { }

const articlesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getArticles: builder.query<IPaginatedArticles, string>({
            query: (queries) => ({
                url: `/api/articles?${queries}`,
                method: "GET",
            }),
        }),
        getArticle: builder.query<IArticle, string>({
            query: (id) => ({
                url: formatUrl(`${id}/`),
                method: "GET",
            }),
        }),
        updateArticle: builder.mutation<IArticle, IArticle>({
            query: (article) => ({
                url: formatUrl(`${article.article_id}/`),
                method: "PUT",
                body: article
            }),
        }),
        deleteArticle: builder.mutation<void, string>({
            query: (id) => ({
                url: formatUrl(`${id}/`),
                method: "DELETE",
            }),
        }),
        getCategories: builder.query<ICategory[], void>({
            query: () => ({
                url: `/api/categories/`,
                method: "GET",
            }),
        }),
    }),
});


const enhancedApi = articlesApi.enhanceEndpoints({
    addTagTypes: ["modification_articles", "delete_article"],
    endpoints: {
        getArticles: {
            providesTags: ["modification_articles", "delete_article"],
        },
        getArticle: {
            providesTags: ["modification_articles"],
        },
        updateArticle: {
            invalidatesTags: ["modification_articles"],
        },
        deleteArticle: {
            invalidatesTags: ["delete_article"],
        },
    },
});

export const { useGetArticlesQuery, useGetArticleQuery, useUpdateArticleMutation, useDeleteArticleMutation, useGetCategoriesQuery } = articlesApi;
