import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Space, Spin} from 'antd';
import {FilterTwoTone, PlusOutlined} from '@ant-design/icons';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootS, RootState} from "../../../app/rootReducer";
import {Query, Status} from "../../utils";
import {fetchGenres} from "../../genres/genres.reducer";
import {fetchItems} from "../item.reducer";
import {ItemFilter} from "../itemModel";


const { Search } = Input;
const { Option } = Select;

export const FilterDrawer =()=> {
    const [visible, setDrawer]= useState(false);

    // const[filter, setFilter] = useState({})

    const dispatch = useDispatch();
    const { items,item, error, loadingStatus, queryType, filter} = useSelector(

        (state:RootS) => state.items
    )
    let validQuery= (queryType === Query.FETCH)
    let loading = loadingStatus === Status.LOADING && validQuery
    const showDrawer = () => {
        setDrawer(true)
    };
    const { genres} = useSelector(
        (state: RootS) => state.genres
    )
   const onClose = () => {
        setDrawer(false)
    };

    const handleSubmit = (values) => {
        const query:ItemFilter= {
            ...filter,
            language: values.language,
            type: values.type,
            genres: values.genres,
            page:1,
            lastPageReached: false
        }
        dispatch(fetchItems(query, onClose))
    }
    const handleSearch = (values) => {
        const query:ItemFilter= {
            ...filter,
            search:values,
            page:1,
            lastPageReached: false
        }
        dispatch(fetchItems(query, onClose))
    }
        return (
            <>
                <Button type="primary" onClick={()=>setDrawer(true)} icon={<FilterTwoTone />}>
                    Filter Books
                </Button>
                {/*<FilterTwoTone  />*/}
                <Drawer
                    title="filter Books"
                    width={720}
                    onClose={onClose}
                    visible={visible}
                    bodyStyle={{ paddingBottom: 80 }}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            {/*<Button onClick={onClose} type="primary">*/}
                            {/*    Submit*/}
                            {/*</Button>*/}
                        </Space>
                    }
                >
                    <Form layout="vertical" onFinish={handleSubmit}   hideRequiredMark>

                        <Search
                            placeholder="input search text"
                            enterButton="Search"
                            size="large"
                            // suffix={suffix}
                            onSearch={handleSearch}
                        />
                        {/*Language & type*/}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="language"
                                    label="Language"
                                    rules={[]}
                                >
                                    <Select placeholder="Please select an owner">
                                        <Option value="english">English</Option>
                                        <Option value="amharic">Amharic</Option>
                                        <Option value="affan oromo">Affan Oromo</Option>
                                        <Option value="tigrna">Tigrna</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="type"
                                    label="Type"
                                    rules={[]}
                                >
                                    <Select placeholder="Please choose the type">
                                        <Option value="spiritual">Spiritual</Option>
                                        <Option value="secular">Secular</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        {/*Genres & date*/}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label={"Genres"} rules={[]} name="genres">
                                    <Select
                                        // mode="multiple"
                                        // allowClear
                                        style={{ width: '100%' }}
                                        placeholder="Genres"
                                        // defaultValue={['a10', 'c12']}
                                        // onChange={handleChange}
                                    >
                                        {genres.map(genre=>{
                                            return <Option key={genre.id} value={genre.id} >{genre.name}</Option>
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="dateTime"
                                    label="DateTime"
                                    rules={[]}
                                >
                                    <DatePicker.RangePicker
                                        style={{ width: '100%' }}
                                        getPopupContainer={trigger => trigger.parentElement}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

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
                                    {"Filter Books"}
                                </Button>}
                            </div>
                        </Form.Item>
                    </Form>

                </Drawer>
            </>
        );
    }

export default FilterDrawer;

