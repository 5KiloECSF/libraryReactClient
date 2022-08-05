import {UserState} from "../users/user.models";

export const selectAuth = (state) => {
    return state.auth;
}
export const IsAuthenticated = (state):UserState => {
    console.log("user is >>>", selectAuth(state).authenticated)
    return selectAuth(state).authenticated;
}

