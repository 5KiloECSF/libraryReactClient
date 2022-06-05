// import { Form, Input, Button, Typography, Card, Checkbox } from "antd";
// import {LeftCircleOutlined}from "@ant-design/icons"
// import { useHistory, Link } from "react-router-dom";
// import validator from "validator";
// import { useState, useEffect } from "react";
// import firebase from '../../../../Constants/firebaseConstants'
// // import firebase from './firebase.config'
//
//
// import {login} from "../../auth.reducer";
// import {useDispatch, useSelector} from "react-redux";
// import {selectAuth} from "../../auth.selectors";
//
// import {Status} from "../../../utils";
//
// const { Title, Text } = Typography;
//
// // const { getAuth, RecaptchaVerifier } =firebase
//
// const PhoneAuth = () => {
//     const history = useHistory();
//     const dispatch = useDispatch();
//     const state = useSelector(state => state)
//
//     const [credentials, setCredentials] = useState({
//         rememberMe: false,
//         locError: "",
//     });
//     const {  rememberMe, locError } = credentials;
//
//
//
//     useEffect(() => {
//         setCredentials({ rememberMe: false, locError: "" });
//     }, []);
//
//
//     const handleLocalErrors = (msg) => {
//         setCredentials({ ...credentials, locError: msg });
//     };
//
//     const handleChecked = (e) => {
//         setCredentials({ ...credentials, rememberMe: e.target.checked });
//     };
//
//
//
//     const handleSubmit = (values) => {
//         const data={
//             email: values.email,
//             password: values.password,
//         }
//         if (validator.isEmpty(values.email) || validator.isEmpty(values.password)) {
//             handleLocalErrors("All fields are required!");
//             return;
//         }
//         if (!validator.isEmail(values.email)) {
//             handleLocalErrors("Invalid email format!");
//             return;
//         }
//         dispatch(login(data, history, rememberMe))
//     };
//
//
//     const [show, setShow] = useState(false);
//     const [mobile, setMobile] = useState("");
//     const [otpCode, setOtp] = useState("");
//     const [recaptcha, setRecaptcha] = useState<any>();
//     const [confirmRes, setConfirmRes] = useState({});
//
//
//
//     const configureCaptcha = () =>{
//         const   = new firebase.auth.RecaptchaVerifier('sign-in-button', {
//             'size': 'invisible',
//             'callback': (response) => {
//                 // reCAPTCHA solved, allow signInWithPhoneNumber.
//                 setRecaptcha(recaptchaV)
//                 // @ts-ignore
//                 onSignInSubmit();
//                 console.log("Recaptca varified")
//             },
//             defaultCountry: "IN"
//         });
//     }
//
//     const onSignInSubmit = (e) => {
//         e.preventDefault()
//         configureCaptcha()
//         // const phoneNumber = "+251" + this.state.mobile
//         // console.log(phoneNumber)
//         // const appVerifier = window.recaptchaVerifier;
//         firebase.auth().signInWithPhoneNumber(mobile, recaptcha)
//             .then((confirmationResult) => {
//                 // SMS sent. Prompt user to type the code from the message, then sign the
//                 // user in with confirmationResult.confirm(code).
//                 // window.confirmationResult = confirmationResult;
//                 setConfirmRes(confirmationResult)
//                 console.log("OTP has been sent")
//                 // ...
//             }).catch((error) => {
//             // Error; SMS not sent
//             // ...
//             console.log("SMS not sent")
//         });
//     }
//
//     const onSubmitOTP  = (e) =>  {
//         e.preventDefault()
//         // const code = this.state.otp
//         // console.log(code)
//
//         // @ts-ignore
//         confirmRes.confirm(otpCode).then(async (result) => {
//             // User signed in successfully.
//             const user = result.user
//             console.log("user =", JSON.stringify(user))
//             console.log("result=>", JSON.stringify(result))
//
//             try {
//                 // const auth = result.getIdToken()
//
//                 // console.log("resultIdTOken=", JSON.stringify(auth))
//                 const userIdToken = await result.user.getIdToken()
//                 // console.log("userIdToken=", JSON.stringify(userIdToken))
//                 console.log("userIdToken=", userIdToken)
//
//             } catch (e) {
//                 console.log("tryError=", e)
//             }
//
//
//             alert("User is verified")
//             // ...
//         }).catch((error) => {
//             // User couldn't sign in (bad verification code?)
//             // ...
//         });
//     }
//
//
//     return (
//         <>
//             <FormUi onFinish={handleSubmit} show={show} localError={locError} state={state} onChange={handleChecked}  />
//             {/*</div>*/}
//         </>
//     );
// };
//
// export default PhoneAuth;
//
//
//
// function FormUi(props: { onFinish: (values) => void, localError: string, state:any, show:boolean,  onChange: (e) => void }) {
//
//
//
//     //destructuring  the auth
//     const { loadingStatus} =selectAuth(props.state);
//
//
//     const [button, setButton]= useState({color:'primary', text:"Login"})
//
//     useEffect(() => {
//         switch (loadingStatus) {
//             case Status.NORMAL:
//                 setButton({color:"primary", text: "Login"});
//                 return
//             case Status.ERROR:
//                 setButton({color:"danger", text: "error"});
//                 setTimeout(() => {
//                     setButton({color:"primary", text: "Login"});
//                 }, 1000);
//                 return
//             case Status.LOADING:
//
//                 setButton({color:"primary", text: "Loading..."});
//                 return
//             case Status.SUCCESS:
//                 setButton({color:"success", text: "Login"});
//                 return
//             default:
//                 setButton({color:"primary", text: "Login"});
//         }
//     }, [loadingStatus]);
//
//
//     return <div style={
//         {
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//     }}>
//
//         <div className="box-shadow" style={{width: 400, padding: 20}}>
//
//             <Card hoverable style={{width: "500px", display: props.show?"flex":"none" }}>
//                 <Typography.Text>
//                     <LeftCircleOutlined/> <Link to="/">Home</Link>
//                 </Typography.Text>
//                 <div style={{display: "flex", justifyContent: "center"}}>
//
//                     <Title level={3}> Login</Title>
//                 </div>
//                 <Form initialValues={{}} onFinish={props.onFinish}>
//
//                     <Form.Item
//                         name="phone"
//                         rules={[
//                             {required: true, message: "Please input your phone!"},
//                         ]}
//                     >
//                         <Input size="large" placeholder="Email Addressphone"/>
//                     </Form.Item>
//
//                     <Form.Item
//                         name="password"
//                         rules={[
//                             {required: true, message: "Please input your password!"},
//                         ]}
//                     >
//                         <Input.Password size="large" placeholder="Password"/>
//                     </Form.Item>
//
//                     {props.localError ? <Text type="danger">{props.localError}</Text> : ""}
//                     {/*{status}*/}
//
//
//                     <Form.Item>
//                         <div
//                             style={{
//                                 display: "flex",
//                                 justifyContent: "space-evenly",
//                                 alignItems: "baseline"
//
//                             }}
//                         >
//                             <Form.Item>
//                                 <Checkbox onChange={props.onChange}>Remember me</Checkbox>
//                             </Form.Item>
//
//                             <Button
//
//                                 loading={loadingStatus === Status.LOADING}
//                                 // @ts-ignore
//                                 type={button.color}
//                                 disabled={loadingStatus === Status.LOADING}
//                                 htmlType="submit"
//                                 style={{width: "200px"}}
//                             >
//                                 {button.text}
//                             </Button>
//                         </div>
//                     </Form.Item>
//
//                     <Form.Item>
//
//                         <Typography.Text>
//                             Dont have account? <Link to="/signup">sign up</Link>
//                         </Typography.Text>
//                     </Form.Item>
//                 </Form>
//             </Card>
//
//
//             <Card hoverable style={{width: "500px", display: props.show?"flex":"none" }}>
//                 <Typography.Text>
//                     <LeftCircleOutlined/> <Link to="/">Home</Link>
//                 </Typography.Text>
//                 <div style={{display: "flex", justifyContent: "center"}}>
//
//                     <Title level={3}> Enter COde</Title>
//                 </div>
//                 <Form initialValues={{}} onFinish={props.onFinish}>
//
//                     <Form.Item
//                         name="phone"
//                         rules={[
//                             {required: true, message: "Please input your phone!"},
//                         ]}
//                     >
//                         <Input size="large" placeholder="Email Addressphone"/>
//                     </Form.Item>
//
//
//
//                     {props.localError ? <Text type="danger">{props.localError}</Text> : ""}
//                     {/*{status}*/}
//
//
//                     <Form.Item>
//                         <div
//                             style={{
//                                 display: "flex",
//                                 justifyContent: "space-evenly",
//                                 alignItems: "baseline"
//
//                             }}
//                         >
//
//
//                             <Button
//                                 loading={loadingStatus === Status.LOADING}
//                                 // @ts-ignore
//                                 type={button.color}
//                                 disabled={loadingStatus === Status.LOADING}
//                                 htmlType="submit"
//                                 style={{width: "200px"}}
//                             >
//                                 {button.text}
//                             </Button>
//                         </div>
//                     </Form.Item>
//
//
//                 </Form>
//             </Card>
//
//
//             {/*<Link to="/signup">RegisterWIthPhone here</Link>*/}
//         </div>
//     </div>;
// }
export {}