import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi';
import { APIKey } from '../../common/apis/MovieApiKey';

// Thunks for fetching movies and shows
export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async (term) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=movie`)
        .catch((err) => console.log(err));
    return response.data;
});

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async (term) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=series`)
        .catch((err) => console.log(err));
    return response.data;
});

export const fetchAsyncMoviesOrShows = createAsyncThunk('movies/fetchAsyncMoviesOrShows', async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`)
        .catch((err) => console.log(err));
    return response.data;
});

const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {},
    status: 'idle',
    error: null,
    isLoading: false,
    isSelectMoviesOrShows: false,
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addMovies: (state, { payload }) => {
            state.movies = payload;
        },
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieOrShow = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncMovies.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
            })
            .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.movies = payload;
                state.isLoading = false;
            })
            .addCase(fetchAsyncMovies.rejected, (state, { error }) => {
                state.status = 'failed';
                state.error = error.message;
                state.isLoading = false;
            })
            .addCase(fetchAsyncShows.pending, (state) => {
                state.status = 'loading';
                state.isLoading = true;
            })
            .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.shows = payload;
                state.isLoading = false;
            })
            .addCase(fetchAsyncShows.rejected, (state, { error }) => {
                state.status = 'failed';
                state.error = error.message;
                state.isLoading = false;
            })
            .addCase(fetchAsyncMoviesOrShows.pending, (state) => {
                state.status = 'loading';
                state.isSelectMoviesOrShows = true;
            })
            .addCase(fetchAsyncMoviesOrShows.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.selectMovieOrShow = payload;
                state.isSelectMoviesOrShows = false;
            })
            .addCase(fetchAsyncMoviesOrShows.rejected, (state, { error }) => {
                state.status = 'failed';
                state.error = error.message;
                state.isSelectMoviesOrShows = false;
            });
    }
});

export const { addMovies, removeSelectedMovieOrShow } = movieSlice.actions;
export const getIsSelectMoviesOrShows=(state)=>state.movies.isSelectMoviesOrShows
export const getIsLoading = (state) => state.movies.isLoading;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectMoviesOrShows = (state) => state.movies.selectMovieOrShow;

export default movieSlice.reducer;
