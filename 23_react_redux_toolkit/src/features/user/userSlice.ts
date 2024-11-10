import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/types";


interface UserState {
    currentUser: User | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    currentUser: null,
    isAuthenticated: false,
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: () => {},
        logout: () => {}
    }
})

export const { login, logout } = user.actions;
export default user.reducer;