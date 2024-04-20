import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface UserLoggedInStatus{
    isUserLoggedIn:boolean,
    userName:string,
    userRoles:string[],
}


const userLoggedInStatusIntialState:UserLoggedInStatus ={
    isUserLoggedIn: false,
    userName: '',
    userRoles: []
}



export const userLoggedInSlice = createSlice({
    name: "USER LOGGING INFO",
    initialState: userLoggedInStatusIntialState,
    reducers: {
        updateUserLoggedInStatus :(state,action:PayloadAction<UserLoggedInStatus>)=>{
            state.isUserLoggedIn = action.payload.isUserLoggedIn;
            state.userName = action.payload.userName;
            state.userRoles = action.payload.userRoles;
        }
        
    },
});


export const { updateUserLoggedInStatus } = userLoggedInSlice.actions;
export const userLoggedInReducer = userLoggedInSlice.reducer;