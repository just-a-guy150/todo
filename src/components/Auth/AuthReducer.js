import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: null
}

const AuthReducer = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        uploadTokenFromStorage: (state) => {
            state.token = localStorage.getItem('token') || null
        },
        setToken: (state) => {
            state.token = localStorage.setItem('token')
            localStorage.setItem('token')
        },
        removeToken: (state) => {
            state.token = null
            localStorage.removeItem('token')
        }
    }
});

export const {uploadTokenFromStorage, setToken, removeToken} = AuthReducer.actions

export default AuthReducer.reducer