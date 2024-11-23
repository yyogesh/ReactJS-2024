import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../types/types";
import * as api from '../../services/api';

interface PostsState {
    items: Post[];
    comments: Comment[];
    loading: boolean;
    error: string | null;
}

const initialState: PostsState = {
    items: [],
    comments: [],
    loading: false,
    error: null,
};

export const createPostAsync = createAsyncThunk('posts/createPost', async(post: Post) => {
    try {
        const response = await api.createPost(post);
        return response.data;
    } catch (error) {
        throw error;
    }
})

export const fetchPostsAsync = createAsyncThunk('posts/fetchPosts', async(_, { rejectWithValue }) => {
    try {
        const response = await api.fetchPosts();
        return response.data;
    } catch (error) {
        return rejectWithValue('Failed to fetch posts')
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPostAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPostAsync.fulfilled, (state, action) => {
                state.loading = false;
              //  state.items.unshift(action.payload);
            })
            .addCase(createPostAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
            .addCase(fetchPostsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPostsAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchPostsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })
    }
})

export const {clearError} = postsSlice.actions;
export default postsSlice.reducer;