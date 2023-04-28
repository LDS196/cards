import { createSlice, PayloadAction } from "@reduxjs/toolkit"




const slice = createSlice({
    name: "app",
    initialState: {
        error: null as null | string,
        isLoading: true as boolean,
        isAppInitialized: false as boolean,
    },
    reducers:{
      setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
          state.error = action.payload.error;
      },
      setAppStatus: (state, action: PayloadAction<{ isLoading: boolean }>) => {
          state.isLoading = action.payload.isLoading;
      },
      setAppInitialized: (state, action: PayloadAction<{ isAppInitialized: boolean }>) => {
          state.isAppInitialized = action.payload.isAppInitialized;
      },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => {
            return action.type.endsWith("/pending");
        },
        (state) => {
            state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => {
            return action.type.endsWith("/rejected");
        },
        (state, action) => {

            state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => {
            return action.type.endsWith("/fulfilled");
        },
        (state) => {
            state.isLoading = false;
        }
      );
}

})
export const appReducer = slice.reducer
