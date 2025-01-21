import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const PLANET_ENDPOINT = "https://swapi.dev/api/planets/";

export const fetchPlanet = createAsyncThunk(
  "planet/fetchPlanet",
  async (planet) => {
    const response = await fetch(PLANET_ENDPOINT + planet, {
      method: "GET",
    });
    return await response.json();
  },
);

const planetSlice = createSlice({
  name: "planet",
  initialState: {
    planet: {
      name: "",
      diameter: "",
      climate: "",
      population: "",
    },
    status: "",
    error: null,
  },
  reducers: {
    resetPlanet: (state) => {
      state.planet = {
        name: "",
        diameter: "",
        climate: "",
        population: "",
      };

      state.status = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlanet.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchPlanet.fulfilled, (state, action) => {
        state.status = "fullfilled";
        state.planet = action.payload;
      })
      .addCase(fetchPlanet.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { resetPlanet } = planetSlice.actions;
export default planetSlice.reducer;
