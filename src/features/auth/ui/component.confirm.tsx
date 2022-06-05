import {useSelector} from "react-redux";
import {selectAuth} from "../auth.selectors";
import {useEffect, useState} from "react";
import {Status} from "../../utils";
import {Button, Card, Form, Input, Typography} from "antd";
import {LeftCircleOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
const {Title} = Typography;

export function ComponentConfirm(props: { onFinish: (values) => void, error: string, }) {

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

                <Title level={3}>Code Sent to your Device</Title>
            </div>

            <Form onFinish={props.onFinish}>

                {/* ------------------ Code --------------*/}
                <Form.Item
                    name="otp"
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

