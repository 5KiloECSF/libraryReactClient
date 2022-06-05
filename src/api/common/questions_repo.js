import axios from "axios";
import {formatErrors} from "./handle-errors";

export const getAllQuestions = async () => {
    try {
        const response = await axios.get("questions");
        const questions = response.data.message.data;
        return {questions};

    } catch (err) {
        return {
            locError: formatErrors(err),
        };
    }
};

export const createQuestions = async (data) => {
    try {
        const response = await axios.post("questions", data);
        const questions = response.data.message.data;

        return {questions};

    } catch (err) {
        return {
            locError: formatErrors(err),
        };
    }
};

export const getOneQuestion = async (data, id) => {
    try {
        const response = await axios.get(`questions/${id}`);
        const question = response.data.message.data;
        return question;

    } catch (err) {
        console.log("getOneQuestion");
        console.log(err.response);
        return {
            locError: formatErrors(err),
        };
    }
};

export const updateQuestion = async (data, id) => {
    try {
        const response = await axios.patch(`questions/${id}`, data);
        const question = response.data.message.data;
        return question;

    } catch (err) {
        console.log("updateQuestion");
        console.log(err.response);
        return {
            locError: formatErrors(err),
        };
    }
};

export const deleteQuestion = async (id) => {
    try {
        const response = await axios.delete(`questions/${id}`);
        const question = response.data.message.data;


    } catch (err) {
        console.log("updateQuestion");
        console.log(err.response);
        return {
            locError: formatErrors(err),
        };
    }
};
