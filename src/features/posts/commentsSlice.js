import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    comments: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const addNewComment = createAsyncThunk('comments/addNewComment', async (initialComment) => {
    const response = await axios.post(POSTS_URL, initialComment)
    return response.data
})

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        commentAdded: {
            reducer(state, action) {
                state.comments.push(action.payload)
            },
            prepare(title, content) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),

                    }
                }
            }
        },

    },
    extraReducers(builder) {
        builder
            .addCase(fetchComments.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'succeeded'
             
                const loadedPosts = action.payload.map(post => {

                    return post;
                });

                // Add any fetched posts to the array
                state.comments = state.comments.concat(loadedPosts)
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewComment.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                
                console.log(action.payload)
                state.comments.push(action.payload)
            })
    }
})

export const selectAllComments = (state) => state.comments.comments;
export const getCommentsStatus = (state) => state.comments.comments;
export const getCommentsError = (state) => state.comments.error;

export const { commentAdded, reactionAdded } = commentsSlice.actions

export default commentsSlice.reducer