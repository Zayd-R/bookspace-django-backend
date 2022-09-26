import { configureStore } from '@reduxjs/toolkit'
import userBooksReducer from './reducers/userBooksReducer'
import userReducer from './reducers/userReducer'
import testReducer from './reducers/testBookreducer'
export const store = configureStore({
  reducer: {
    user: userReducer,
    userBooks: userBooksReducer,
    testReducer:testReducer
  },
})
