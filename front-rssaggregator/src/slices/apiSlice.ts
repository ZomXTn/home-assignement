import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const state : any = getState();
        const token = state.auth.access;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs,
    unknown,
    FetchBaseQueryError> = async (args, api, extra) => {
        let result = await baseQuery(args, api, extra);
        if (result.error && result.error.status === 401) {
            // try to get a new token
            const refreshResult = await baseQuery({
                url: '/auth/refresh/',
                method: 'POST',
            } as FetchArgs,
                api,
                extra
            );
            if (refreshResult.data) {
                // store the new token
                const { access } = refreshResult.data as any
                api.dispatch(setCredentials({ access }))
                // retry the initial query
                result = await baseQuery(args, api, extra)
            } else {
                api.dispatch(api.dispatch(logout))
            }
        }
        return result

    }

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithRefresh,
    endpoints: (builder) => ({})
})


