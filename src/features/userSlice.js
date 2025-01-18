import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (url = "https://swapi.dev/api/people") => {
    const response = await fetch(url, {
      method: "GET",
    });
    const responseJson = await response.json();
    return { response: responseJson, url };
  },
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    next: null,
    previous: null,
    count: 0,
    page: 1,
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
        const { response, url } = action.payload;
        const { next, results, count, previous } = response;
        state.data = results;
        state.previous = previous;
        state.next = next;
        state.count = count;
        state.page =
          url === "https://swapi.dev/api/people" ? 1 : url.split("=")[1];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
