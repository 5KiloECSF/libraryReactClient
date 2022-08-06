// @ts-ignore
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AppThunk} from 'app/store'
import ApiService, {ItemService} from 'api/api.service'

import {ActionError, UserModel, UserState} from "./user.models";
import {Query, Status, updateItem} from "../utils";
import { message } from 'antd';

const usersApiUrl='users'

const initialState: UserState={

    users:[],
    user:{},
    loadingStatus:Status.NORMAL,
    uploadStatus:Status.NORMAL,
    error:null,
    queryType:""
}



const users = createSlice({
    name:'users',
    initialState,
    reducers:{
            queryStart(state, action: PayloadAction<string>){
                state.loadingStatus=Status.LOADING
                state.queryType=action.payload
            },
            fetchUsersSuccess(state, action: PayloadAction<UserModel[]>) {

                state.users=action.payload
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.FETCH
                state.error = null
            },
            getUserSuccess(state, action: PayloadAction<UserModel>) {
                state.user= action.payload
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.FETCH_ONE
                state.error = null
            },
           createUserSuccess(state, action: PayloadAction<UserModel>) {
                // const { comments, issueId } = action.payload
                state.users= state.users.concat(action.payload)
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.CREATE
                state.error = null
            },
            updateUserSuccess(state, action: PayloadAction<UserModel>){


                const itms=updateItem(state.users, action.payload)
                state.users=itms
                // let objIndex = state.users.findIndex((obj => obj.id == action.payload.id));
                // state.users[objIndex]=action.payload
                // state.users= state.users.map(user=>arry.find(q=>q.id===user.id)||user)
                // state.users= state.users.map(ques=>action.payload.id===ques.id||ques)
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.UPDATE
                state.error = null
            },
            deleteSuccess(state, action: PayloadAction<string>) {
                state.users= state.users.filter(user=>user.id!==action.payload)
                state.loadingStatus = Status.SUCCESS
                state.queryType=Query.DELETE
                state.error = null
            },
            queryFailure(state, action: PayloadAction<ActionError>) {
                state.loadingStatus = Status.ERROR
                state.error = action.payload.error
                state.queryType=action.payload.queryType
            },
            setUser(state, action:PayloadAction<UserModel>){
                state.user=action.payload
            }

        }
})

export const {
    queryStart,
    fetchUsersSuccess,
    getUserSuccess,
    createUserSuccess,
    updateUserSuccess,
    deleteSuccess,
    queryFailure,
    setUser
} = users.actions

export default users.reducer

const getResponseData=(value)=> value.data.value


export const fetchUsers = (query, setModal): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.FETCH))
        const users = await ApiService.query(usersApiUrl,query)

        let itms:UserModel[]=getResponseData(users)

        dispatch(fetchUsersSuccess(itms))
        setModal()
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.FETCH}))
    }
}

export const getOne = (id:string): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.FETCH_ONE))
        const users = await ApiService.get(usersApiUrl, id)
        let questns:UserModel=getResponseData(users)
        dispatch(getUserSuccess(questns))
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.FETCH_ONE}))
    }
}


export const createOne = (user, cleanUp): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.CREATE))
        const users = await ApiService.post(usersApiUrl, user)
        let itm:UserModel=getResponseData(users)

        dispatch(createUserSuccess(itm))
        message.success('User Created Succesfully');
        cleanUp()
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.CREATE}))
        message.error(err.message);
    }
}

export const updateOne = (id:string, user, cleanUp): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.UPDATE))
        const users = await ApiService.update(usersApiUrl, id, user)
        let itm:UserModel=getResponseData(users)
        dispatch(updateUserSuccess(itm))
        message.success('User Updated Successfully');
        cleanUp()
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.UPDATE}))
        message.error(err.message);
    }
}

export const deleteOne = (id:string): AppThunk => async dispatch => {
    try {
        dispatch(queryStart(Query.DELETE))
        const user = await ApiService.delete(usersApiUrl, id)
        dispatch(deleteSuccess(id))
        message.success('User Deleted Successfully');
    } catch (err) {
        dispatch(queryFailure(<ActionError>{error:err.message, queryType:Query.DELETE}))
        message.error(err.message);
    }
}

