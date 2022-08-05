import {BaseUser, status, UserModel} from "../users/user.models";


export interface AuthModel extends BaseUser{

    email?: string
    password?: string
    idToken?:string
    phone?:string
    firebaseId?:string

    role?:string

    totalDonatedBooks?:number
    totalPledgedBooks?:number
    status?: status
}

export interface AuthState {
    authenticated: boolean,
    token:string,


    //user related
    isAdmin:false,
    currentLoggedInUser?: UserModel|{},

    loadingStatus: string,
    uploadStatus?:string
    error: Error|null,
    queryType: string,
}

export interface ActionError{
    error:Error,
    queryType:string
}
