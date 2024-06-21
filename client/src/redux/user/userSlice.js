import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentuser:null,
    loading:false,
    error:false
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true
        },
        signInSuccess:(state,action)=>{
            console.log(action.payload),
            state.currentuser=action.payload,
            state.loading=false,
            state.error=false
        }
        ,
        signInFailure:(state,action)=>{
            state.currentuser=null,
            state.loading=false,
            state.error=action.payload
        },
        logoutSuccess:(state)=>{
            state.currentuser=null,
            state.loading=false
        }
    }
})

export default userSlice.reducer;
export const {signInStart,signInFailure,signInSuccess,logoutSuccess} = userSlice.actions;