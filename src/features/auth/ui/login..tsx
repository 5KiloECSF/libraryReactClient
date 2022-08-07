import {Button, Card, Checkbox, Form, Input, Typography} from "antd";
import {LeftCircleOutlined, PhoneOutlined} from "@ant-design/icons"
import {Link, useHistory} from "react-router-dom";
import validator from "validator";
import {useEffect, useState} from "react";

import {login} from "../auth.reducer";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../auth.selectors";

import {Status} from "../../utils";
import {AuthState} from "../auth.model";
import { setButtonColor} from "./utils";
import prefixSelector from "./components";
const { Title, Text } = Typography;


const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
    locError: "",
  });
  const [rememberMe, setRememberMe]=useState(true)
  const {   locError } = credentials;

  useEffect(() => {
    setCredentials({ email: "", password: "", rememberMe: false, locError: "" });
  }, []);


  const handleErrors = (msg) => {
    setCredentials({ ...credentials, locError: msg });
  };
  const handleChecked = (e) => {
    setRememberMe(e.target.checked )
    setCredentials({ ...credentials, rememberMe: e.target.checked });
  };



  const handleSubmit = (values) => {
    const data={
      phone: "+251"+values.phone,
      password: values.password,
      rememberMe:values.rememberMe
    }
    // setRememberMe(values.rememberMe)
    // console.log("rememberMe==", values.rememberMe)

    if (validator.isEmpty(values.phone) || validator.isEmpty(values.password)) {
      handleErrors("All fields are required!");
      return;
    }
    // if (!validator.isEmail(values.email)) {
    //   handleErrors("Invalid email format!");
    //   return;
    // }

    dispatch(login(data, history, rememberMe))
  };

  return (
    <>
      <LoginUi onFinish={handleSubmit} locError={locError}  onChange={handleChecked}/>
      {/*</div>*/}
    </>
  );
};

export default Login;

function LoginUi(props: { onFinish: (values) => void, locError: string, onChange: (e) => void,  }) {


  const state = useSelector(state => state)
  //destructuring  the auth

  const authStatus:AuthState =selectAuth(state);
  const [button, setButton]= useState({color:'primary', text:"Login"})


  useEffect(() => {

    setButtonColor(authStatus.loadingStatus, setButton)

  }, [authStatus.loadingStatus]);







  return <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }}>
    <div className="box-shadow" style={{width: 400, padding: 20}}>
      <Card hoverable style={{width: "500px"}}>
        <Typography.Text>
          <LeftCircleOutlined/> <Link to="/">Home</Link>
        </Typography.Text>
        <div style={{display: "flex", justifyContent: "center"}}>

          <Title level={3}> Login</Title>
        </div>
        <Form initialValues={{}} onFinish={props.onFinish}>
          {/* =====================  --------- email ---------- =======================*/}
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
                prefix={<PhoneOutlined className="site-form-item-icon"/>}
                addonBefore={prefixSelector}
                style={{
                  width: "100%",
                }}
            />
          </Form.Item>
          {/* ---------------------======== === password =============-------------------------*/}
          <Form.Item
              name="password"
              rules={[
                {required: true, message: "Please input your password!"},
              ]}
          >
            <Input.Password size="large" placeholder="Password"/>
          </Form.Item>

          <Form.Item >
            <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "baseline"

                }
                }
            >
              <Form.Item name="rememberMe">
                <Checkbox defaultChecked={true} onChange={props.onChange}>Remember me</Checkbox>
              </Form.Item>

              {/*===================---------------  Submit Button ------------------===========*/}
              <Button

                  loading={authStatus.loadingStatus === Status.LOADING}
                  // @ts-ignore
                  type={button.color}
                  disabled={authStatus.loadingStatus === Status.LOADING}
                  htmlType="submit"
                  style={{width: "200px"}}
              >
                {button.text}
              </Button>
            </div>
          </Form.Item>

          <Form.Item>

            {/*<Typography.Text>*/}
            {/*  Dont have account? <Link to="/signup">sign up</Link>*/}
            {/*</Typography.Text>*/}
          </Form.Item>
        </Form>
      </Card>
      {/*<Link to="/signup">RegisterWIthPhone here</Link>*/}
    </div>
  </div>;
}

