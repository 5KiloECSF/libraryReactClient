import {GenresModel, GenresState} from "./genresModel";


export const genresState = (state):GenresState => {
    return state.genres;
}

export const selectItems = (state):GenresModel[] => {
    return genresState(state).genres;
}
