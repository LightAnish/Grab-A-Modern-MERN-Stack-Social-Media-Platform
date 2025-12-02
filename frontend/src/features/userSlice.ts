import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userState {
  user: object | string | null
}

const initialState: userState = {
  user: "Anish Kumar"
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
      setUser: (state, action: PayloadAction<object>) => {
        state.user = action.payload
  },}
})


export const { setUser } = userSlice.actions

export default userSlice.reducer