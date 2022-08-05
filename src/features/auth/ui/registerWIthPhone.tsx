import {Button, Card, Col, Form, Input, Row, Typography} from "antd";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import firebase from '../../../Constants/firebaseConstants'
import {signup} from "../auth.reducer";

import {useEffect, useState} from "react";
import validator from "validator";
import Routes from "../../../Constants/routes";
import {LOG_g, Status} from "../../utils";
import {LeftCircleOutlined, LockOutlined, PhoneOutlined} from "@ant-design/icons";
import {UserModel} from "../../users/user.models";
import prefixSelector from "./components";
import {ComponentRegister} from "./component.Register";
import { ComponentConfirm } from "./component.confirm";

const {Title, Text} = Typography;


const RegisterWIthPhone = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [error, setError] = useState('')


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


        onSignInSubmit()

    }

    const configureCaptcha = async () => {
        console.log("inCatapcha-->")
        // @ts-ignore
        // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        //     'size': 'invisible',
        //     'callback': async (response) => {
        //         console.log("recaptchaV==>", response)
        //         // reCAPTCHA solved, allow signInWithPhoneNumber.
        //         // setRecaptcha(recaptchaV)4
        //
        //
        //         await onSignInSubmit();
        //
        //         console.log("Recaptca varified")
        //     },
        //     defaultCountry: "IN"
        // });

    }

    const onSignInSubmit = async () => {
        // e.preventDefault()
        console.log("onSignSubmit==>")
        await configureCaptcha()
        const phoneNumber =  usr.phone
        // const phoneNumber = "+251" + usr.phone
        console.log("cred=>>", credentials)

        console.log("pp=", phoneNumber)

        // @ts-ignore
        const appVerifier = window.recaptchaVerifier;
        try {
            // const res = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            // setConfirmationResult(res)
            // console.log("resForVerify==>", res)
            // window.confirmationResult = confirmationResult;
            setShowConfirmation(true)
            console.log("OTP has been sent")
        } catch (e) {
             console.log("err", e)
            // Error; SMS not sent
            setError("error verifying your phone")
            setShowConfirmation(false)
            // ...
            console.log("someError happned")
        }
        // firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
        //     .then((confirmationResult) => {
        //         // SMS sent. Prompt user to type the code from the message, then sign the
        //         // user in with confirmationResult.confirm(code).
        //
        //         // @ts-ignore
        //         setConfirmationResult(confirmationResult)
        //         // window.confirmationResult = confirmationResult;
        //         setShowConfirmation(true)
        //         console.log("OTP has been sent")
        //         // ...
        //     }).catch((error) => {
        //     console.log("err", error)
        //     // Error; SMS not sent
        //     setError("error verifying")
        //     setShowConfirmation(false)
        //     // ...
        //     console.log("SMS not sent")
        //     return
        // });

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

