import {useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import {selectAuth} from "../auth.selectors";
import {useState} from "react";
import {Button, Card, Col, Form, Input, Row, Typography} from "antd";
import {LeftCircleOutlined, LockOutlined, PhoneOutlined} from "@ant-design/icons";
import prefixSelector from "./components";
import Routes from "../../../Constants/routes";
const {Title, Text} = Typography;



export function ComponentRegister(props: { onFinish: (values) => void, error: string, }) {

    const state = useSelector(state => state)
    //destructuring  the auth
    const {loadingStatus} = selectAuth(state);
    const [button, setButton] = useState({color: 'primary', text: "Sign Up"})




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
                        prefix={<PhoneOutlined className="site-form-item-icon"/>}
                        addonBefore={prefixSelector}
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Item>


                {/*-------------------password ----------------*/}
                <Form.Item
                    name="password"
                    rules={[{required: true, message: "Please input your password!"}]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon"/>}
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
                            // htmlType=""
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
