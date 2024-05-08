import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfile{
    userName:string,
    userRoles:string[],
    userEmail:string,
    userId:string,
    lastLoggedIn:string, 

}

export const userProfile:UserProfile ={
    userName: "",
    userRoles: [],
    userEmail: "",
    userId: "",
    lastLoggedIn: ""
}

export const userProfileSlice = createSlice({
    name: "USER PROFILER",
    initialState: userProfile,
    reducers: {
        userProfileInfo :(state,action:PayloadAction<UserProfile>) =>{
            state.lastLoggedIn = action.payload.lastLoggedIn;
            state.userEmail = action.payload.userEmail;
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
            state.userRoles = action.payload.userRoles;
        }
    }
})


export const { userProfileInfo } = userProfileSlice.actions;
export const userProfileReducer = userProfileSlice.reducer;
