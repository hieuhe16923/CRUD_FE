import { configureStore } from '@reduxjs/toolkit'
import PetsReducer from "./reducers/PetsReducer"
export const store = configureStore({
    reducer: {
        pets: PetsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch