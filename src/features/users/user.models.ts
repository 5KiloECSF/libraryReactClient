import {Status} from "../utils";
import {GenreModel} from "../genres/genre.model";


export interface BaseUser{
    id?:string
    firstName? :string
    lastName? :string
    fullName? :string
    image?: {
        imageCover?:string
        suffix?:string
        imagePath?:string
    }
}
export interface UserModel extends BaseUser{

    email?: string
    password?: string
    idToken?:string
    phone?:string


    role?:string

    totalDonatedBooks?:number
    totalPledgedBooks?:number
    status?: status
}

export interface Author extends BaseUser{
    bio?: string
}

export enum status{
    Active,
    Graduated,
    Unknown
}


export interface UserState {

    users?: UserModel[],
    user?: UserModel | {},

    loadingStatus: string,
    uploadStatus?:string
    error: Error|null,
    queryType: string,
}

export interface ActionError{
    error:Error,
    queryType:string
}
