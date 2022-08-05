import {USER_TOKEN} from "../Constants/constants";
import Cookies from "js-cookie";
import {UserModel} from "../features/users/user.models";

interface AuthData {
  user:UserModel,
  token:string
}

export const getAuthData = ():AuthData => {
  let jsonToken = window.localStorage.getItem(USER_TOKEN)
  return JSON.parse(jsonToken)
};

export const saveTokenToLocalStorage = (token, user) => {

  // document.cookie = `token=${res.data.token};${expires};path=/`;
  try{
    console.log("saving to local Storage")
    let authData=JSON.stringify({
      user,
      token,
    })
    Cookies.set(
        "AUTH",
        authData
    );
    console.log("authdata==", authData)
    window.localStorage.setItem(USER_TOKEN, authData);
  }catch (e){
    console.log("saving failed", e.message)
  }


};

export const destroyToken = () => {
  window.localStorage.removeItem(USER_TOKEN);
};


export default { getToken: getAuthData, saveToken: saveTokenToLocalStorage, destroyToken };
