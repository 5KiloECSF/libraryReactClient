

export interface GenreModel {
    id: string
    name: string

    image?: {
        images?: string[]
        imageCover?:string
        suffix?:string
        imagePath?:string
    }

    description?:string


    booksCount?:number
}

export interface GenresState {

    genres?: GenreModel[],
    genre?: GenreModel | {},

    loadingStatus: string,
    uploadStatus?:string
    error: Error|null,
    queryType: string,
}

export interface ActionError{
    error:Error,
    queryType:string
}


