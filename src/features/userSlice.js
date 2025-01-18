import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (url = "https://swapi.dev/api/people") => {
    const response = await fetch(url, {
      method: "GET",
    });
    return response.json();
  },
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    next: null,
    previous: null,
    count: 0,
    status: "",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "fullfilled";
        const { next, results, count, previous } = action.payload;
        state.data = results;
        state.previous = previous;
        state.next = next;
        state.count = count;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
