import httpClient from "@/lib/http-client";
import { News, User } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UUID } from "crypto";

// export const loadProfile = createAsyncThunk("app/loadProfile", async () => {
//   console.log("loadProfile");
//   const result = await httpClient.get("/users/profile");
//   return result.data?.payload;
// });

interface AppState {
  loading: boolean;
  news: News[];
}

const initialState: AppState = {
  loading: false,
  news: [
    {
      id: "2154d277-aa73-4efd-b0b1-b70e66bc2132",
      title: "Vaguthu",
      description:
        "Fugiat dolor reprehenderit voluptate irure deserunt sunt aute esse mollit nostrud officia. Lorem consectetur laboris est cupidatat est duis sint Lorem deserunt amet sit mollit do cupidatat. Commodo officia consequat incididunt laborum nulla labore excepteur non nisi laboris magna aute labore mollit. Adipisicing aute ex sit eu eu veniam aliqua esse velit mollit duis duis sit culpa. Occaecat tempor non deserunt commodo labore aliqua reprehenderit eu ipsum. Lorem enim esse exercitation ad sint anim aliquip ea.",
      created_at: "2021-08-10T09:00:00.000000Z",
      updated_at: "2021-08-10T09:00:00.000000Z",
      source_id: "2154d277-aa73-4efd-b0b1-b70e66bc2132",
      is_active: true,
      source_url: "https://example.com",
      source_name: "example",
      reference_urls: ["https://example.com"],
      score: 76,
      rating: "positive",
    },
    {
      id: "2154d277-aa75-4efd-b0b1-b70e66bc2132",
      title: "Mihaaru",
      description:
        "Irure commodo incididunt eiusmod aute ullamco. Lorem esse nisi ipsum in cupidatat aute elit voluptate voluptate. Minim qui eu occaecat sit cupidatat sint dolore ullamco.",
      created_at: "2021-08-10T09:00:00.000000Z",
      updated_at: "2021-08-10T09:00:00.000000Z",
      source_id: "2154d277-aa73-4efd-b0b1-b70e66bc2132",
      is_active: true,
      source_url: "https://example.com",
      source_name: "example",
      reference_urls: ["https://example.com"],
      score: 35,
      rating: "negative",
    },
    {
      id: "2154d277-aa35-4efd-b0b1-b70e66bc2132",
      title: "Twitter",
      description:
        "Cillum est eiusmod tempor est do. Non ut eiusmod eu fugiat voluptate cillum excepteur in excepteur magna consectetur ea dolore. Fugiat minim adipisicing exercitation ea consectetur velit ex voluptate aliquip commodo.",
      created_at: "2021-08-10T09:00:00.000000Z",
      updated_at: "2021-08-10T09:00:00.000000Z",
      source_id: "2154d277-aa73-4efd-b0b1-b70e66bc2132",
      is_active: true,
      source_url: "https://example.com",
      source_name: "example",
      reference_urls: ["https://example.com"],
      score: 35,
      rating: "negative",
    },
    {
      id: "2154d277-aa35-4efd-b0b1-b70e66bc6432",
      title: "Twitter",
      description:
        "Lorem labore consectetur incididunt duis. Voluptate velit commodo deserunt do sint nisi. Dolor consectetur ad sit voluptate est amet laborum exercitation do aute officia laboris.",
      created_at: "2021-08-10T09:00:00.000000Z",
      updated_at: "2021-08-10T09:00:00.000000Z",
      source_id: "2154d277-aa73-4efd-b0b1-b70e66bc2132",
      is_active: true,
      source_url: "https://example.com",
      source_name: "example",
      reference_urls: ["https://example.com"],
      score: 35,
      rating: "negative",
    },
  ],
};

export const authSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;

export default authSlice.reducer;