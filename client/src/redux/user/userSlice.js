import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser:null ,
    Error:null , 
    loading:false
}

const userSlice = createSlice({
    name:'user',
    initialState , 
    reducers:{
        signInStart:(state)=>{
            state.loading = true 
        },
        signInSucess:(state , action)=>{
            state.currentUser = action.payload;
            state.loading = false , 
            state.Error = null
        },
        signInFailure:(state , action)=>{
            state.Error = action.payload,
            state.loading = false
        }
    }
})
export const {signInFailure , signInStart , signInSucess} = userSlice.actions;

export default userSlice.reducer