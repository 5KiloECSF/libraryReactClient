import axios from "axios";
import { formatErrors } from "./handle-errors";

export const loginBackend = async (data) => {
  try {
    const response = await axios.post("auth/login", data);

    const token = response.data.token;
    const user = response.data.message.data;
    return {
      token,
      user,
    };
  } catch (err) {
    console.log(err.response);

    return {
      locError: formatErrors(err),
    };
  }
};

export const registerBackend = async (data ) => {

  try {
    const response = await axios.post("auth/register", data);
    const user = response.data.message.data;

    return {
      user,
    };
  } catch (err) {
    return {
      locError: formatErrors(err),
    };
  }
};
