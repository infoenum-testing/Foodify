import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "John Doe",
    avatar: "https://i.pinimg.com/originals/f6/3d/6f/f63d6f466b53aad3332bf8cdb22d73a2.jpg",
  },
  reducers: {
    updateUser: (state, action) => {
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
