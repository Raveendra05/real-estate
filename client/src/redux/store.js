import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './user/userSlice'

export default configureStore({
  reducer: {user : UserReducer},
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:false,
    }),
})