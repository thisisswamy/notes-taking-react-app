import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserLoggedInStatus{
    isUserLoggedIn:boolean,
    userEmail?:String
}


const userLoggedInStatusIntialState:UserLoggedInStatus ={
    isUserLoggedIn: false,
    userEmail:''
}



export const userLoggedInSlice = createSlice({
    name: "USER LOGGING INFO",
    initialState: userLoggedInStatusIntialState,
    reducers: {
        updateUserLoggedInStatus :(state,action:PayloadAction<UserLoggedInStatus>)=>{
            state.isUserLoggedIn = action.payload.isUserLoggedIn;
            state.userEmail = action.payload.userEmail
        }
        
    },
});


export const { updateUserLoggedInStatus } = userLoggedInSlice.actions;
export const userLoggedInReducer = userLoggedInSlice.reducer;