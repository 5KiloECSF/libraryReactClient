import {Alert, Button, Card, Col, Form, Input, Row, Typography} from "antd";
import {Link, useHistory,useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import firebase from '../../../Constants/firebaseConstants'
import {signup} from "../auth.reducer";

import {useEffect, useState} from "react";
import validator from "validator";

import {LOG_g, Status} from "../../utils";

import {UserModel} from "../../users/users.models";

import {ComponentRegister} from "./component.Register";
import { ComponentConfirm } from "./component.confirm";
import {setUpRecaptha} from "../../../utils/firebase_configrations";

const {Title, Text} = Typography;


const RegisterWIthPhone = () => {

    const [error, setError] = useState("");
    const [number, setNumber] = useState("");
    const [flag, setFlag] = useState(false);
    const [otp, setOtp] = useState("");
    const [result, setResult] = useState("");

    const navigate = useNavigate();

    const history = useHistory();
    const dispatch = useDispatch();


    const getOtp = async (e) => {
        e.preventDefault();
        console.log(number);
        setError("");
        if (number === "" || number === undefined)
            return setError("Please enter a valid phone number!");
        try {
            const response = await setUpRecaptha(number);

            // @ts-ignore
            setResult(response);
            setFlag(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        setError("");
        if (otp === "" || otp === null) return;
        try {
            // @ts-ignore
            await result.confirm(otp);

            navigate("/home");
        } catch (err) {
            setError(err.message);
        }
    };

    const [credentials, setCredentials] = useState<UserModel>({})
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
    const [confirmationResult, setConfirmationResult] = useState<any>()

    let usr: UserModel = {}

    const handleSubmitInfo = (values) => {

        console.log("values==>", values)
        dispatch(LOG_g("values", values))

        if (validator.isEmpty(values.phone)  || validator.isEmpty(values.firstname) ) {
            setError("All fields are required!");
            setTimeout(() => {
                setError("");
            }, 5000);
            return;
        }
        // if (values.password != values.confirmPassword || validator.isEmpty(values.password) || validator.isEmpty(values.confirmPassword)) {
        //     setError("password and match password dont match");
        //     setTimeout(() => {
        //         setError("");
        //     }, 5000);
        //     return;
        // }
        let user: UserModel = {
            phone: values.phone,
            firstName: values.firstname,
            lastName: values.lastname,
            password: "123456"
        }
        // useEffect(() => { setCredentials(usr) }, [])
        setCredentials(user)
        usr = user
        console.log("cred1=>>", credentials)



    }


    const handleSubmitCode = async (values) => {
        // console.log("handleSubmit", values)

        let userIdToken


        try {
            // const auth = result.getIdToken()

            const res = await confirmationResult.confirm(values.code)
            console.log("result=>", JSON.stringify(res))
            // console.log("resultIdTOken=", JSON.stringify(auth))
            userIdToken = await res.user.getIdToken()
            // console.log("userIdToken=", JSON.stringify(userIdToken))
            console.log("userIdToken=", userIdToken)

            alert("User is verified")
            const data = {
                firstname: credentials.firstName,
                lastname: credentials.lastName,
                phone: credentials.phone,
                // email: credentials.email,
                password: credentials.password,
                idToken: userIdToken
            }
            // dispatch(LOG_g("handleSubmit", data))
            // console.log("data=0/", data)
            // console.log("cer==>", credentials)


            dispatch(signup(data, history))
        } catch (e) {
            console.log("tryError=", e)
            setError("code error")
            setTimeout(() => {
                setError("");
            }, 1000);
        }


        // ...




    };

    // @ts-ignore
    return (
        <>
            {/*<div id="recaptcha-container"/>*/}
            <div id="sign-in-button"/>
            {!showConfirmation ? <ComponentRegister onFinish={handleSubmitInfo} error={error}/> : ""}
            {showConfirmation ? <ComponentConfirm onFinish={handleSubmitCode} error={error}/> : ""}


            {/*</div>*/}
        </>
    );
};

export default RegisterWIthPhone;

// ===================    ========   The RegisterWIthPhone Component -----------

