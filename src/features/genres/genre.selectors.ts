import {GenreModel, GenresState} from "./genre.model";


export const genresState = (state):GenresState => {
    return state.genres;
}

export const selectItems = (state):GenreModel[] => {
    return genresState(state).genres;
}
