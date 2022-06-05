import {Form, Select} from "antd";

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

 export default prefixSelector;
