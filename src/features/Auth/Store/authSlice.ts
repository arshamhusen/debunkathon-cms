import httpClient from "@/lib/http-client";
import { useAppDispatch } from "@/stores/hooks";
import { User } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (payload: any) => {
    console.log("loginAsync", payload);
    const result = await httpClient.post("/users/login", payload);
    return result.data.payload;
  }
);

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  return true;
});

interface AuthStoreState {
  user: User | null;
  loading: boolean;
  token: string;
}

const initialState: AuthStoreState = {
  user: null,
  loading: false,
  token: "hello_token",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: { ...initialState, token: localStorage.getItem("token") },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.token = action.payload.access_token;
      state.loading = false;
      console.log("state.token", state.token);
      localStorage.setItem("token", state.token);
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      console.log("loginAsync rejected");
      state.loading = false;
    });
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutAsync.fulfilled, (state, action) => {
      state.user = null;
      state.token = null;
      state.loading = false;
    });
    builder.addCase(logoutAsync.rejected, (state, action) => {
      console.log("logoutAsync rejected");
      state.loading = false;
    });
    builder.addCase(logoutAsync.pending, (state) => {
      state.token = null;
      state.loading = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getCurrentUser = (state: AuthStoreState) => state.user;

export default authSlice.reducer;
