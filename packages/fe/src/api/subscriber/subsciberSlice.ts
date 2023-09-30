import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "./types"

interface UserState {
  users: User[]
}

const initialState: UserState = {
  users: [],
}

const subsciberSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSubscriber: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload
    },
  },
})

export const { setSubscriber } = subsciberSlice.actions
export default subsciberSlice.reducer
