import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SEARCH_ENDPOINT = "https://swapi.dev/api/people/?search=";

const PEOPLE_ENDPOINT = "https://swapi.dev/api/people";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ search = "", page }) => {
    let url = "";
    if (search) {
      url = `${SEARCH_ENDPOINT}${search}&page=${page}`;
    } else {
      url = `${PEOPLE_ENDPOINT}?page=${page}`;
    }

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
    search: "",
  },
  reducers: {
    resetPage: (state) => {
      state.page = 1;
    },
  },
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
        state.page = Number(url.split("page=")[1]);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { resetPage } = userSlice.actions;
export default userSlice.reducer;
