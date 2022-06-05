import axios, { AxiosInstance, AxiosResponse} from 'axios';
import {UserModel} from "../../features/users/users.models";

let api: AxiosInstance, isLoggedIn: boolean
const envBaseUrl = process.env.REACT_APP_API_URL


const instance = axios.create({
    baseURL: envBaseUrl,
    timeout: 15000,
});

const getData = (res: AxiosResponse) => res.data

const requests = {
    delete: (url: string) => api.delete(url).then(getData),
    get: (url: string) => api.get(url).then(getData),
    put: (url: string, body: any) => api.put(url, body).then(getData),
    post: (url: string, body: any) => api.post(url, body).then(getData),
}

const auth = {
    me() {
        if (!isLoggedIn) {
            return Promise.resolve({user: null})
        }
        return requests.get('/auth/me').catch(error => {
            if (error.response.status === 401) {
                logout()
                return {user: null}
            }
            return Promise.reject(error)
        })
    },
    logout: () => {
        logout()
        return Promise.resolve({user: null})
    },
    login: (form: any) =>
        requests.post('/auth/login', form).then(data => {
            login({token: data.user.token})
            return data
        }),
    register: (form: any) =>
        requests.post('/auth/register', form).then(data => {
            login({token: data.user.token})
            return data
        }),
}

const users = {
    get: (id:string):Promise<UserModel> => requests.get(id ? `/users/${id}` : '/users'),
    create: (user:UserModel):Promise<UserModel> => requests.post('/users', user),
    update: (id:string, updates:UserModel):Promise<UserModel> => requests.put(`/users/${id}`, updates),
    delete: (id:string): Promise<void>  => requests.delete(`/users/${id}`),
}

const posts = {
    delete: (id: any) => requests.delete(`/posts/${id}`),
    get: (id: any) => requests.get(id ? `/posts/${id}` : '/posts'),
    update: (id: any, updates: any) => requests.put(`/posts/${id}`, updates),
    create: (post: any )=> requests.post('/posts', post),
}

function logout() {
    window.localStorage.removeItem('token')
    init({token: null})
}

function login({token}) {
    window.localStorage.setUser('token', token)
    init({token})
}

function init({
                  token = window.localStorage.getItem('token'),
                  baseURL = (api && api.defaults.baseURL) || envBaseUrl,
                  axiosOptions = {headers: {}},
              } = {}) {
    isLoggedIn = Boolean(token)
    api = axios.create({
        baseURL,
        ...axiosOptions,
        headers: {
            authorization: token ? `Bearer ${token}` : undefined,
            ...axiosOptions.headers,
        },
    })
}

export {init, users, posts, auth}