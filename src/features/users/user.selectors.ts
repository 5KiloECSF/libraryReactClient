import {UserModel, UserState} from "./user.models";


export const genresState = (state):UserState => {
    return state.genres;
}

export const selectItems = (state):UserModel[] => {
    return genresState(state).users;
}
