import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "user",
    initialState: null,
    reducers:{
        loginUser(state, {payload}){
            return payload
        },

        logoutUser(state, {payload}){
            return null
        }
    }
})

export const {loginUser, logoutUser} = slice.actions
export default slice.reducer
