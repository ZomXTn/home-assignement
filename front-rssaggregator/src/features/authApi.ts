import { logout, setCredentials, setUser } from "../slices/authSlice"
import { IUser } from "../types/entities";
import { IActivation, IPaginated } from "../types/types";
import { apiSlice } from './../slices/apiSlice';

interface IAuth {
    access: string,
}

interface ICredentials {
    email: string,
    password: string
}

interface IPaginatedUsers extends IPaginated<IUser> { }

const formatUrl = (url: string) => `auth/${url}`

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IAuth, ICredentials>({
            query: (credentials) => ({
                url: formatUrl("login/"),
                method: "POST",
                body: credentials
            }),
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setCredentials({ access: data.access }))
                } catch (error) {
                    console.error(error)
                }
            }
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: formatUrl("logout/"),
                method: "POST",
            }),
            onQueryStarted: async (arg, { dispatch, queryFulfilled, getState }) => {
                try {
                    const end = await queryFulfilled
                    dispatch(logout())
                    dispatch(apiSlice.util.resetApiState())
                } catch (error) {
                    console.error(error)
                }
            }
        }),
        //profile crud
        getProfile: builder.query<any, void>({
            query: () => ({
                url: formatUrl("profile/"),
                method: "GET",
            }),
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled
                    dispatch(setUser(data))
                } catch (error) {
                    console.error(error)
                }
            }
        }),
        updateProfile: builder.mutation<any, any>({
            query: (profile) => ({
                url: formatUrl("edit-profile/"),
                method: "put",
                body: profile
            }),
        }),
        deleteProfile: builder.mutation<void, { current_password: string }>({
            query: (body) => ({
                url: formatUrl("delete-profile/"),
                method: "DELETE",
                body
            }),
            onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled
                    dispatch(logout())
                } catch (error) {
                    console.error(error)
                }
            }
        }),
        getUsers: builder.query<IPaginatedUsers, string>({
            query: (queries) => ({
                url: formatUrl(`users/?${queries}`),
                method: "GET",

            }),
        }),
        register: builder.mutation<any, IUser>({
            query: (user) => ({
                url: formatUrl("register/"),
                method: "POST",
                body: user
            }),
        }),
        editUser: builder.mutation<any, IUser>({
            query: (user) => ({
                url: formatUrl(`users/${user.id}/update/`),
                method: "put",
                body: user
            }),
        }),
        getUser: builder.query<IUser, number>({
            query: (id) => ({
                url: formatUrl(`users/${id}/`),
                method: "GET",
            }),
        }),
        activeAccount: builder.mutation<any, IActivation>({
            query: (credentials) => ({
                url: formatUrl("activation/"),
                method: "POST",
                body: credentials
            }),
        }),
        resendActivation: builder.mutation<any, { email: string }>({
            query: (email) => ({
                url: formatUrl("resend-activation/"),
                method: "POST",
                body: email
            }),
        }),
        forgotPassword: builder.mutation<any, { email: string }>({
            query: (email) => ({
                url: formatUrl("reset-password/"),
                method: "POST",
                body: email
            }),
        }),
        confirmPassword: builder.mutation<any, { uid: string, new_password: string, token: string }>({
            query: (credentials) => ({
                url: formatUrl("reset-password-confirm/"),
                method: "POST",
                body: credentials
            }),
        }),
        changeEmail: builder.mutation<any, { new_email: string, current_password: string, re_new_email: string }>({
            query: (email) => ({
                url: formatUrl("change-email/"),
                method: "POST",
                body: email
            }),
        }),
        changePassword: builder.mutation<any, { current_password: string, new_password: string, re_new_password: string }>({
            query: (passwords) => ({
                url: formatUrl("change-password/"),
                method: "POST",
                body: passwords
            }),
        }),
    }),
})

const enhancedApi = authApi.enhanceEndpoints({
    addTagTypes: ["modification_users", "update_profile"],
    endpoints: {
        getUsers: {
            providesTags: ["modification_users"],
        },
        getUser: {
            providesTags: ["modification_users"],
        },
        getProfile: {
            providesTags: ["update_profile"],
        },
        updateProfile: {
            invalidatesTags: ["update_profile"],
        },
        register: {
            invalidatesTags: ["modification_users"],
        },
        editUser: {
            invalidatesTags: ["modification_users"],
        },
        changeEmail: {
            invalidatesTags: ["update_profile"],
        },
    },
});

export const { useLoginMutation, useLogoutMutation, useGetProfileQuery, useDeleteProfileMutation, useUpdateProfileMutation, useGetUsersQuery, useRegisterMutation, useEditUserMutation, useGetUserQuery, useActiveAccountMutation, useResendActivationMutation, useForgotPasswordMutation, useConfirmPasswordMutation, useChangeEmailMutation, useChangePasswordMutation } = authApi

