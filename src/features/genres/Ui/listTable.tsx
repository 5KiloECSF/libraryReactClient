import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Table, Input, Popconfirm, Form, Typography, Space, Tag, Select, Alert, Avatar, message} from 'antd';
import {RootS, RootState} from 'app/rootReducer';
import {fetchGenres, deleteOne} from "../genres.reducer";
import AddEditGenre from "./AddUpdate";
import {setGenre} from '../genres.reducer'


import {GenresModel} from "../genresModel";

const ListTable = () => {
    const dispatch = useDispatch()
    const { genres, error, loadingStatus, queryType} = useSelector(
        (state: RootS) => state.genres
    )
    const [queryCtr, setQueryCtr]=useState(0)
    useEffect(() => {
        if (genres.length < 1&&queryCtr<5) {
            dispatch(fetchGenres())
            setQueryCtr(queryCtr+1)
            // dispatch(LOG_g("questions", questions))
        }
        // Since we may have the issue already, ensure we're scrolled to the top
        window.scrollTo({top: 0})
    }, [dispatch, genres])



    const [form] = Form.useForm();
    const [editModalOpen, setEditModal]= useState(false);

    const Delete = (record) => {
        dispatch(deleteOne(record.id))
    };

    const columns = [
        {
            // title:'image',
            dataIndex:'image',
            render:image=>(
                <Avatar size={64} src={image?image.imagePath +image.imageCover+image.suffix:""} />
            )
        },
        {
            title: 'name',
            dataIndex: 'name',
            width: '40%',

        },

        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: GenresModel) => {
                return (
                    <Space size={"middle"}>
                        <Typography.Link disabled={editModalOpen ===true} onClick={() => {
                            message.info("hi");

                            dispatch(setGenre(record));
                            // <Alert message="Success Text" type="success" />
                            setEditModal(true )
                        }}>
                        Edit
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?" onConfirm={()=>Delete(record)}>
                            <a >  Delete</a>
                        </Popconfirm>
                    </Space>

                );
            },
        },
    ];
    return (
        <>
            <AddEditGenre isOpen={editModalOpen} onClose={()=>setEditModal(false)} isUpdate={true}/>


            {/*<AddQuestion id={editingKey} editMode={true} isOpen={modalOpen} onClose={()=>setModal(false)}/>*/}
            <Form form={form} component={false}>
                <Table
                   bordered
                    dataSource={genres}
                    columns={columns}
                    rowClassName="editable-row"
                    // pagination={{
                    //     onChange: cancel,
                    // }}
                />
            </Form>
        </>

    );
};

export default ListTable;


