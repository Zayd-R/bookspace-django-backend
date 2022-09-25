import { configureStore } from '@reduxjs/toolkit'
import userBooksReducer from './reducers/userBooksReducer'
import userReducer from './reducers/userReducer'
export const store = configureStore({
  reducer: {
    user: userReducer,
    userBooks: userBooksReducer,
  },
})
