import axios from "axios";
import { formatErrors } from "./handle-errors";

export const getUser = async () => {
  try {
    const response = await axios.get("users/me");
    const user = response.data.message.data;
    return {
      user,
    };
  } catch (err) {
    console.log("getUser");
    console.log(err.response);
    return {
      locError: formatErrors(err),
    };
  }
};

export const updateUser = async (data) => {
  try {
    const response = await axios.patch("users/me/update", data);
    const user = response.data.message.data;
    return {
      user,
    };
  } catch (err) {
    console.log("updateUser");
    console.log(err.response);
    return {
      locError: formatErrors(err),
    };
  }
};


export const changePassword = async ({ oldPassword, newPassword }) => {
  try {
    const response = await axios.patch("users/me/changePassword", {
      currentPassword: oldPassword,
      newPassword,
    });
    const user = response.data.message.data;
    return {
      user,
    };
  } catch (err) {
    console.log("changePassword");
    console.log(err.response);
    return {
      locError: formatErrors(err),
    };
  }
};


