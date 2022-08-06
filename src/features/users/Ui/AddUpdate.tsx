import React,{useEffect, useState} from "react";
import {Button, Form, Input, message, Modal, Typography, Upload, Spin, InputNumber, Row, Col, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined, PhoneOutlined, PlusOutlined} from "@ant-design/icons";
import {createOne, updateOne} from "../user.reducer";
import {beforeUpload, getBase64, isJpgOrPng} from "../../../utils/image-util";

import {Query, Status} from "../../utils";
import {RootS, RootState } from "../../../app/rootReducer";
import prefixSelector from "../../auth/ui/components";

const { Option } = Select;

const AddEditUser = ({ isOpen, onClose, isUpdate }) => {

    const { genres, genre, error, loadingStatus, queryType} = useSelector(
        (state:RootS) => state.genres
    )
    const dispatch = useDispatch();
    const [formRef] = Form.useForm();

    //======================  image preview ======================
    const [preview, setPreview] = useState({
        previewModalVisible: false,
        previewImage: "",
        previewTitle: "",
    });
    const [removedImages, setRemovedImages]= useState([])
    let validQuery= !!(queryType === Query.CREATE || Query.UPDATE)
    let loading = loadingStatus === Status.LOADING && validQuery
    // const [loading, setLoading]= useState(false)

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreview({
            previewImage: file.url || file.preview,
            previewModalVisible: true,
            previewTitle:
                file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
        });
    };

    //======================= Image Form =============
    const [imageForm, setImageForm] = useState({
        file: null,
        fileList: [],
    });

    const handleImageChange = ({ fileList, file }) => setImageForm({ ...imageForm, file, fileList });


        //Use effect for displaying image to be updated
        useEffect(() => {
            if(isUpdate){
                formRef.setFieldsValue(genre);
                if ("image" in genre) {
                    let imag=genre.image
                    let pImage= {url:`${imag.imagePath + imag.imageCover + imag.suffix}`}
                    setImageForm({...imageForm, file:pImage, fileList: [pImage]})
                }
                setRemovedImages([])
            }
            // setUrl([...url,{ url: item.image.imageCover}])
        }, [genre]);

    const cleanup=()=>{
        onClose()
        formRef.resetFields()

    }
    const handleSubmit = (values) => {
        const formData = new FormData();
        console.log("values=", values)
        if (!imageForm.file) {
            message.error("Book cover photo is required");
        } else if (!("url" in imageForm.file)&& !isJpgOrPng(imageForm.file)) {
            message.error("Book cover can only be JPG/PNG file!");
        } else {
            formData.append("firstName", values.name);
            formData.append("description", values.description)

            //------------------------ IMAGE RELATED UPDATES -------------------
            //we check url property to check if the file is the old link or new file added
            //because only links have the url property
            if ( !("url" in imageForm.file)) {
                formData.append('imageCover', imageForm.file.originFileObj)
            }

            if ("id" in genre && isUpdate){
                dispatch(updateOne(genre.id, formData, cleanup))
            }else if(!isUpdate){
                dispatch(createOne(formData, cleanup))
            }
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>{isUpdate?"Update":"Create User "}</div>
        </div>);

    return (
        <>
            <Modal
                title={isUpdate?"Update User":"Create User"}
                visible={isOpen}
                onOk={handleSubmit}
                onCancel={onClose}
                footer={[]}
            >
                <Form initialValues={{}} form={formRef} onFinish={handleSubmit}>

                    {/*first & last name*/}
                    <Form.Item>
                        <Input.Group>
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item rules={[{required: true}]} name="firstname">

                                        <Input size="large" placeholder="first name" name="firstName"/>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item rules={[{required: true}]} name="last_name">
                                        <Input size="large" placeholder="last name" name="lastName"/>
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



                    {/*     ---------- ----------- ============== image ===================== ----------------*/}
                    {/*|
                       |
                       |
                       |*/}
                    {/*---- CoverImage ---*/}
                    <Form.Item>
                        <Typography.Text>Cover Photo</Typography.Text>
                        <Upload
                            listType="picture-card"
                            // @ts-ignore
                            fileList={imageForm.fileList}
                            onPreview={handlePreview}
                            onChange={handleImageChange}
                            beforeUpload={beforeUpload}
                            maxCount={1}
                        >
                            {imageForm.fileList.length >=1 ? null : uploadButton}
                        </Upload>
                    </Form.Item>


                    {/* -- ===== Submit Button ```````````*/}
                    <Form.Item>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            {
                                loading?<Spin />:<Button
                                type="primary"
                                htmlType="submit"
                                style={{width: "150px"}}
                            >
                                {isUpdate?"Update User":"Create User"}
                            </Button>
                            }
                        </div>
                    </Form.Item>

                </Form>
            </Modal>

            {/* ==== image Preview modal for Displaying Image ===== ----*/}
            <Modal  visible={preview.previewModalVisible}
                    title={preview.previewTitle}
                    footer={null}
                    onCancel={() => {
                        setPreview({previewImage: "", previewTitle: "", previewModalVisible: false })
                        // setForm({...form, file: null})

                    }} >
                <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={preview.previewImage}
                />

            </Modal>
        </>
    );
};

export default AddEditUser;

