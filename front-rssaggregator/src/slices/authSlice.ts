import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState, persistor } from "../store/store"
import { IUser } from "../types/entities"
import localStorage from "redux-persist/es/storage"
interface IAuthState {
    access: string | null,
    user: IUser | null,
    isAuthenticated: boolean
}

const authSlice = createSlice({
    name: "auth",
    initialState: { access: null, user: null, isAuthenticated: false } as IAuthState,
    reducers: {
        setCredentials: (state, { payload }: PayloadAction<{ access: string }>) => {
            state.access = payload.access
            state.isAuthenticated = true
        },
        setUser: (state, { payload }: PayloadAction<any>) => {
            state.user = payload
        },
        logout: (state) => {
            state.access = null
            state.user = null
            state.isAuthenticated = false
            localStorage.removeItem("persist:RSS Aggregator")
        }
    }
})

export const { setCredentials, logout, setUser } = authSlice.actions
export default authSlice.reducer
export const selectAccessToken = (state: RootState) => state.auth.access
export const selectUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
export type AuthState = IAuthState