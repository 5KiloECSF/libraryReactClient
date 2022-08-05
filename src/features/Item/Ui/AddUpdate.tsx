import React,{useEffect, useState} from "react";
import {
    Button,
    Form,
    Input,
    message,
    Modal,
    Typography,
    Upload,
    Spin,
    InputNumber,
    Row,
    Col,
    Select, Checkbox,
} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {createItems, updateItems} from "../item.reducer";
import {beforeUpload, getBase64, isJpgOrPng} from "../../../utils/image-util";

import {Query, Status} from "../../utils";
import {RootS, RootState} from "../../../app/rootReducer";

const { Option } = Select;

const AddEditBook = ({ isOpen, onClose, isUpdate }) => {

    const { item, error, loadingStatus, queryType} = useSelector(
        (state:RootS) => state.items
    )
    let validQuery= !!(queryType === Query.CREATE || Query.UPDATE)
    let loading = loadingStatus === Status.LOADING && validQuery
    // @ts-ignore
    const { genres} = useSelector(
        (state: RootState) => state.genres
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

    //======================= Image Form =========
    const [imageForm, setImageForm] = useState({
        file: null,
        file2:null,
        fileList: [],
        fileList2: [],
    });

    const handleImageChange = ({ fileList, file }) => setImageForm({ ...imageForm, file, fileList });
    const handleImage2Change = (info) => {
        // console.log("-----Changed2--->",info, )
        // console.log("-----Form1--->",imageForm, )
        setImageForm({...imageForm, file2: info.file, fileList2: info.fileList})
    };

        //Update item Use Effect
        useEffect(() => {
            if(isUpdate){
                formRef.setFieldsValue(item);
                if ("image" in item) {
                    let imag=item.image
                    let pImage= {url:`${imag.imagePath + imag.imageCover + imag.suffix}`}

                    let list=[]
                    item.image.images.forEach(img => {
                        list=[...list,{url: `${imag.imagePath+img+imag.suffix}`, name:img} ]
                        // setForm({...form, fileList2: [...form.fileList2, {url: `${imag.imagePath+img+imag.suffix}`}]})
                    })
                    setImageForm({...imageForm,file:pImage, fileList: [pImage], fileList2: list})
                }
                setRemovedImages([])
            }

            // setUrl([...url,{ url: item.image.imageCover}])
        }, [item]);

        // const genres=["Christian  history", "Prayer", "poetry", "Biography & Auto Biography"]
        const tags=["history", "Prayer", "Holistic", ]


    //TODO
    const onRemove= (file)=>{
       if ("url" in file) {
           setRemovedImages([...removedImages, file.name])
           // console.log("-----RemoveList-------->", removedImages)
       }
        // console.log("-----Remove--------",file)
    }

    const handleSubmit = (values) => {
        const formData = new FormData();
        console.log("values=", values)
        if (!imageForm.file) {
            message.error("Book cover photo is required");
        } else if (!("url" in imageForm.file)&& !isJpgOrPng(imageForm.file)) {
            message.error("Book cover can only be JPG/PNG file!");
        } else {
            formData.append("name", values.name);
            formData.append("description", values.description)
            formData.append("language", values.language)
            formData.append("type", values.type)
            formData.append("booksAmount", values.booksAmount||1)
            formData.append("pageNo", values.pageNo||100)
            formData.append("available", values.available)
            formData.append("genres", values.genres)

            //------------------------ IMAGE RELATED UPDATES -------------------
            //we check url property to check if the file is the old link or new file added
            //because only links have the url property
            if ( !("url" in imageForm.file)) {
                formData.append('imageCover', imageForm.file.originFileObj)
            }
            imageForm.fileList2.forEach(file => {
                if ( !("url" in file)) {
                    formData.append('images', file.originFileObj);
                }
            });
            removedImages.forEach(img=>{
                console.log("removing images", img)
                formData.append("removedImages", img)
            })

            if ("id" in item && isUpdate){
                dispatch(updateItems(item.id, formData))
            }else if(!isUpdate){
                dispatch(createItems(formData))
            }
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>{isUpdate?"Update":"Create Book "}</div>
        </div>);

    return (
        <>
            <Modal
                title={isUpdate?"Update Book":"Create Book"}
                visible={isOpen}
                onOk={handleSubmit}
                onCancel={onClose}
                footer={[]}
            >
                <Form initialValues={{}} form={formRef} onFinish={handleSubmit}>
                    {/*------------------   =======  name  ========== --------------------*/}
                    <Form.Item name="name"  rules={[{ required: true, message: "Please input book name!" }]}          >
                        <Input size="large" placeholder="Book Name" value={"name" in item ? item.name :""}  />
                    </Form.Item>

                    {/*Language & type*/}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="language"
                                label="Language"
                                rules={[{ required: true, message: "language is required" }]}
                            >
                                <Select placeholder="Please select an owner">
                                    <Option value="english">English</Option>
                                    <Option value="amharic">Amharic</Option>
                                    {/*<Option value="affan oromo">Affan Oromo</Option>*/}
                                    {/*<Option value="tigrna">Tigrna</Option>*/}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="type"
                                label="Type"
                                rules={[{ required: true, message: "book type is required" }]}
                            >
                                <Select placeholder="Please choose the type">
                                    <Option value="spiritual">Spiritual</Option>
                                    <Option value="secular">Secular</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    {/*Genres & tags*/}
                    <Form.Item>
                        <Input.Group>
                            {/*This works in 24 partitions*/}
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item label={"Genres"} rules={[{required: true}]} name="genres">
                                        <Select
                                            // mode="multiple"
                                            // allowClear
                                            style={{ width: '100%' }}
                                            placeholder="Genres"
                                            // defaultValue={['a10', 'c12']}
                                            // onChange={handleChange}
                                        >
                                            {genres.map(genre=>{
                                                return <Option key={genre.id} value={genre.id}>{genre.name}</Option>
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={"Tags"}  name="tags">
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{ width: '100%' }}
                                            placeholder="select Tags for this book"
                                            // defaultValue={[]}
                                            // onChange={handleChange}
                                        >
                                            {tags.map(tag=>{
                                                return <Option key={tag} value={tag}>{tag}</Option>
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Input.Group>
                    </Form.Item>
                    {/*Amount & Page NO   available*/}
                    <Form.Item>
                        <Input.Group>
                            <Row gutter={12}>
                                <Col span={8}>
                                    <Form.Item label={"amount"} name="booksAmount">
                                        <InputNumber  placeholder="books amount" min={1} max={1000} defaultValue={1} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={"page no"}  name="pageNo">
                                        <InputNumber placeholder="books pages" name="pageNo"/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item valuePropName="checked" name="available">
                                        <Checkbox name="available" defaultChecked={true} >book Available</Checkbox>
                                    </Form.Item>

                                </Col>
                            </Row>
                        </Input.Group>
                    </Form.Item>







                    {/*   ------------------      * description     ----------------------*/}
                    <Form.Item name="description"
                               rules={[
                                   { required: true, message: "Please input book description!" },
                               ]}
                    >
                        <Input.TextArea rows={5} placeholder="Description" defaultValue={"description" in item ? item.description :""}/>
                    </Form.Item>



                    {/*     ---------- ----------- ============== images ===================== ----------------*/}
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

                    {/*--- alternative Images ---*/}
                    <Form.Item>
                        <Typography.Text>Other Images</Typography.Text>
                        <Upload
                            listType="picture-card"
                            // @ts-ignore
                            fileList={imageForm.fileList2}
                            onPreview={handlePreview}
                            onChange={handleImage2Change}
                            beforeUpload={beforeUpload}
                            maxCount={3}
                            onRemove={onRemove}
                        >
                            {imageForm.fileList2.length >2 ? null : uploadButton}

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
                            {loading?<Spin />:<Button
                                type="primary"
                                htmlType="submit"
                                style={{width: "150px"}}
                            >
                                {isUpdate?"Update book":"Create Book"}
                            </Button>}
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

export default AddEditBook;

