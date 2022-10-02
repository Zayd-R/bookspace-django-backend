import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'notification',
  initialState: {"message":null, "type":null},
  reducers: {
    notifyWith(state,{payload}) {
        return {...state, message: payload}
    },
   notificationType(state, {payload}){
    return {...state, type: payload}

   }
  },
})

export const setNotification = (notification,type) => {
  return async (dispatch) => {
    dispatch(notifyWith(notification))
    dispatch(notificationType(type))

    setTimeout(() => {
      dispatch(notifyWith(null))
      dispatch(notificationType(null))

    }, 5000)
  }
}

const { notifyWith, notificationType } = slice.actions
export default slice.reducer