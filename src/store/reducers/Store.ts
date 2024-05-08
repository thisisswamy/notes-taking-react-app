import { configureStore } from '@reduxjs/toolkit'
import { userLoggedInReducer } from '../slices/userLoggedInSlice'
import { userProfile, userProfileReducer } from '../slices/userProfileSlice'

export const store = configureStore({
  reducer: {
    userLoggedIn : userLoggedInReducer,
    userProfile:userProfileReducer
  },
})




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch