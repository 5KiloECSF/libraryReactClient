import {UserModel, UserState} from "./users.models";


export const genresState = (state):UserState => {
    return state.genres;
}

export const selectItems = (state):UserModel[] => {
    return genresState(state).users;
}
