import { Form, Input, Typography, Card, Button,Col, Row,Select } from "antd";
import { useHistory, Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import firebase from '../../../../Constants/firebaseConstants'
import {signup} from "../../auth.reducer";
import {selectAuth} from "../../auth.selectors";
import { useEffect, useState } from "react";
import validator from "validator";
import Routes from "../../../../Constants/routes";
import {LOG_g, Status} from "../../../utils";
import {LeftCircleOutlined} from "@ant-design/icons";
import { UserOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;



const RegisterWIthPhone = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [error, setError]= useState('')

    const [recaptcha, setRecaptcha] = useState<any>("");
    const [credentials, setCredentials]= useState<any>({})
    const [showConfirmation, setShowConfirmation]= useState<boolean>(false)
    const [confirmationResult, setConfirmationResult]= useState<any>()




    // const configureCaptcha = () =>{
    //
    //     // @ts-ignore
    //     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    //         'size': 'invisible',
    //         'callback': (response) => {
    //             console.log("recaptchaV==>", response)
    //             // reCAPTCHA solved, allow signInWithPhoneNumber.
    //             // setRecaptcha(recaptchaV)4
    //
    //
    //             onSignInSubmit();
    //
    //             console.log("Recaptca varified")
    //         },
    //         defaultCountry: "IN"
    //     });
    //
    // }

    const handleSubmitInfo=(values)=>{

        console.log("values==>", values)
        dispatch(LOG_g("values", values))

        if (validator.isEmpty(values.phone) || validator.isEmpty(values.password) ||validator.isEmpty(values.firstname)||validator.isEmpty(values.confirmPassword)) {
            setError("All fields are required!");
            setTimeout(() => {
                setError("");
            }, 5000);
            return;
        }
        if(values.password!=values.confirmPassword){
            setError("password and match password dont match");
            setTimeout(() => {
                setError("");
            }, 5000);
            return;
        }


        setCredentials(values)


        onSignInSubmit()

    }
    const onSignInSubmit = () => {
        // e.preventDefault()
        console.log("onSignSubmit==>")
        // configureCaptcha()
        const phoneNumber = "+251" + credentials.phone

        console.log(phoneNumber)

        // @ts-ignore
        const appVerifier = window.recaptchaVerifier;
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
        //         console.log("err", error)
        //         // Error; SMS not sent
        //         setError("error verifying")
        //         // ...
        //     console.log("SMS not sent")
        //     return
        // });

    }

  const handleSubmitCode = async (values) => {
      // console.log("handleSubmit", values)

      let userIdToken
      confirmationResult.confirm(values.code).then(async (result) => {
          // User signed in successfully.
          const user = result.user
          console.log("user =", JSON.stringify(user))
          console.log("result=>", JSON.stringify(result))

          try {
              // const auth = result.getIdToken()

              // console.log("resultIdTOken=", JSON.stringify(auth))
              userIdToken = await result.user.getIdToken()
              // console.log("userIdToken=", JSON.stringify(userIdToken))
              console.log("userIdToken=", userIdToken)

          } catch (e) {
              console.log("tryError=", e)
              setError("code error")
              setTimeout(() => {
                  setError("");
              }, 1000);
          }


          alert("User is verified")
          // ...
      }).catch((error) => {

          // User couldn't sign in (bad verification code?)
          // ...
      });

   const data={
     firstname: credentials.firstname,
     lastname: credentials.lastname,
     phone: credentials.phone,
     // email: credentials.email,
     password: credentials.password,
     idToken: userIdToken
   }
   dispatch(LOG_g("handleSubmit", data))



   dispatch(signup(data, history))

  };

    // @ts-ignore
    return (
    <>
        <div id="recaptcha-container"/>
        {!showConfirmation ? <RegisterComponent onFinish={handleSubmitInfo}  error={error} />:""}
        {showConfirmation ? <ConfirmComponent onFinish={handleSubmitCode}  error={error} />:""}


        {/*</div>*/}
    </>
  );
};

export default RegisterWIthPhone;

// ===================    ========   The RegisterWIthPhone Component -----------

function RegisterComponent(props: { onFinish: (values) => void,  error: string,  }) {

    const state = useSelector(state => state)
    //destructuring  the auth
    const { loadingStatus } =selectAuth(state);
    const [button, setButton]= useState({color:'primary', text:"Sign Up"})

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                defaultValue={"+251"}
                style={{
                    width: 80,
                }}
            >
                <Select.Option value="251">+251</Select.Option>
            </Select>
        </Form.Item>
    );

    useEffect(() => {

        switch (loadingStatus) {
            case Status.NORMAL:
                setButton({color:"primary", text: "Sign Up"});
                return
            case Status.ERROR:
                setButton({color:"danger", text: "error"});
                setTimeout(() => {
                    setButton({color:"primary", text: "Sign Up"});
                }, 1000);
                return
            case Status.LOADING:

                setButton({color:"primary", text: "Loading..."});
                return
            case Status.SUCCESS:
                setButton({color:"success", text: "Sign Up"});
                return
            default:
                setButton({color:"primary", text: "Sign Up"});
        }
    }, [loadingStatus]);




    return <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}
    >
        <Card hoverable style={{width: "500px"}}>
            <Typography.Text>
                <LeftCircleOutlined/> <Link to="/">Home</Link>
            </Typography.Text>
            <div style={{display: "flex", justifyContent: "center"}}>

                <Title level={3}> Create account</Title>
            </div>

            <Form onFinish={props.onFinish}>


                {/*first & last name*/}
                <Form.Item>
                    <Input.Group>
                        <Row gutter={12}>
                            <Col span={12}>
                                <Form.Item rules={[{required: true}]} name="firstname">

                                    <Input size="large" placeholder="first name" name="firstname"/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={[{required: true}]} name="last_name">
                                    <Input size="large" placeholder="last name" name="last_name"/>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Input.Group>
                </Form.Item>
                {/* ------------- phone -----------*/}
                <Form.Item
                    name="phone"
                    // label=""
                    rules={[
                        {
                            required: true,
                            message: "Please input your phone number!",
                        },
                    ]}
                >
                    <Input
                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                        addonBefore={prefixSelector}
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Item>

         

                {/* -------------------password ----------------*/}
                <Form.Item
                    name="password"

                    rules={[{required: true, message: "Please input your password!"}]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        size="large" placeholder="Password"/>
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    rules={[{required: true, message: "Please input your confirm password!"}]}
                >
                    <Input.Password size="large" placeholder="Confirm your password"/>
                </Form.Item>
                {props.error ? <Text type="danger">{props.error}</Text> : ""}

                {/*========================== Submit Button =================*/}
                <Form.Item>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {/*  */}
                        <Button
                            // @ts-ignore
                            type={button.color}
                            htmlType="submit"
                            style={{width: "200px"}}
                        >
                            {button.text}
                        </Button>
                    </div>
                </Form.Item>


                <Form.Item>
                    <Typography.Text>
                        Already have accout? <Link to={Routes.LOGIN}>Login</Link>
                    </Typography.Text>
                </Form.Item>
            </Form>
        </Card>

    </div>;
}

function ConfirmComponent(props: { onFinish: (values) => void,  error: string,  }) {

    const state = useSelector(state => state)
    //destructuring  the auth
    const { loadingStatus } =selectAuth(state);
    const [button, setButton]= useState({color:'primary', text:"Sign Up"})



    useEffect(() => {

        switch (loadingStatus) {
            case Status.NORMAL:
                setButton({color:"primary", text: "Verify"});
                return
            case Status.ERROR:
                setButton({color:"danger", text: "error"});
                setTimeout(() => {
                    setButton({color:"primary", text: "Verify"});
                }, 1000);
                return
            case Status.LOADING:

                setButton({color:"primary", text: "Loading..."});
                return
            case Status.SUCCESS:
                setButton({color:"success", text: "Verify"});
                return
            default:
                setButton({color:"primary", text: "Verify"});
        }
    }, [loadingStatus]);


    return <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }}
    >
        <Card hoverable style={{width: "500px"}}>
            <Typography.Text>
                <LeftCircleOutlined/> <Link to="/">Home</Link>
            </Typography.Text>
            <div style={{display: "flex", justifyContent: "center"}}>

                <Title level={3}>Code Sent to your Device</Title>
            </div>

            <Form onFinish={props.onFinish}>





                {/* ------------------ Code --------------*/}
                <Form.Item
                    name="code"
                    rules={[{required: true, message: "Please input code sent to your device!"}]}
                >
                    <Input size="large" placeholder="verification code"/>
                </Form.Item>



                {/*========================== Submit Button =================*/}
                <Form.Item>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {/*  */}
                        <Button
                            // @ts-ignore
                            type={button.color}
                            htmlType="submit"
                            style={{width: "200px"}}
                        >
                            {button.text}
                        </Button>
                    </div>
                </Form.Item>



            </Form>
        </Card>

    </div>;
}
