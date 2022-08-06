// @ts-ignore
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppThunk} from 'app/store'
import ApiService, {ItemService} from 'api/api.service'

import {ActionError, GenreModel, GenresState} from "./genre.model";
import {Query, Status, updateItem} from "../utils";
import { message } from 'antd';

const genresApiUrl='genres'

const initialState: GenresState={
    genres:[],
    genre:{},
    loadingStatus:Status.NORMAL,
    uploadStatus:Status.NORMAL,
    error:null,
    queryType:"",
}



const genres = createSlice({
    name:'genres',
    initialState,
    reducers:{
            queryStart(state, action: PayloadAction<string>){
                state.loadingStatus=Status.LOADING
                state.queryType=action.payload
            },
            fetchGenresSuccess(state, action: PayloadAction<GenreModel[]>) {
                // const { comments, issueId } = action.payload
                state.genres=action.payload
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.FETCH
                state.error = null
            },
            getGenreSuccess(state, action: PayloadAction<GenreModel>) {
                state.genre= action.payload
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.FETCH_ONE
                state.error = null
            },
           createGenreSuccess(state, action: PayloadAction<GenreModel>) {
                // const { comments, issueId } = action.payload
                state.genres= state.genres.concat(action.payload)
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.CREATE
                state.error = null
            },
            updateGenreSuccess(state, action: PayloadAction<GenreModel>){


                const itms=updateItem(state.genres, action.payload)
                state.genres=itms
                // let objIndex = state.genres.findIndex((obj => obj.id == action.payload.id));
                // state.genres[objIndex]=action.payload
                // state.genres= state.genres.map(genre=>arry.find(q=>q.id===genre.id)||genre)
                // state.genres= state.genres.map(ques=>action.payload.id===ques.id||ques)
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.UPDATE
                state.error = null
            },
            deleteSuccess(state, action: PayloadAction<string>) {
                state.genres= state.genres.filter(genre=>genre.id!==action.payload)
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.DELETE
                state.error = null
            },
            queryFailure(state, action: PayloadAction<ActionError>) {
                state.loadingStatus = Status.ERROR
                state.error = action.payload.error
                state.queryType=action.payload.queryType
            },
            setGenre(state, action:PayloadAction<GenreModel>){
                state.genre=action.payload
            }

        }
})

export const {
    queryStart,
    fetchGenresSuccess,
    getGenreSuccess,
    createGenreSuccess,
    updateGenreSuccess,
    deleteSuccess,
    queryFailure,
    setGenre
} = genres.actions

export default genres.reducer

const getResponseData=(value)=> value.data.value


export const fetchGenres = (): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.FETCH))
        const genres = await ApiService.query(genresApiUrl,{})

        let itms:GenreModel[]=getResponseData(genres)

        dispatch(fetchGenresSuccess(itms))

    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.FETCH}))
    }
}

export const getOne = (id:string): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.FETCH_ONE))
        const genres = await ApiService.get(genresApiUrl, id)
        let questns:GenreModel=getResponseData(genres)
        dispatch(getGenreSuccess(questns))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.FETCH_ONE}))
    }
}


export const createOne = (genre, cleanUp): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.CREATE))
        const genres = await ApiService.post(genresApiUrl, genre)

        let itm:GenreModel=getResponseData(genres)

        dispatch(createGenreSuccess(itm))
        message.success('Genre Created Succesfully');
        cleanUp()
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.CREATE}))
        message.error(err.message);
    }
}

export const updateOne = (id:string, genre, cleanUp): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.UPDATE))
        const genres = await ApiService.update(genresApiUrl, id, genre)
        let itm:GenreModel=getResponseData(genres)
        dispatch(updateGenreSuccess(itm))
        message.success('Genre Updated Successfully');
        cleanUp()
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.UPDATE}))
        message.error(err.message);
    }
}

export const deleteOne = (id:string): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.DELETE))
        const genre = await ApiService.delete(genresApiUrl, id)
        dispatch(deleteSuccess(id))
        message.success('Genre Deleted Successfully');
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.DELETE}))
        message.error(err.message);
    }
}

