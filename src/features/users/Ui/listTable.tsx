import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Table,  Popconfirm, Form, Typography, Space, Tag, Select, Alert, Avatar, message} from 'antd';
import {RootS} from 'app/rootReducer';
import {fetchUsers, deleteOne} from "../user.reducer";
import AddEditUser from "./AddUpdate";
import {setUser} from '../user.reducer'


import {UserModel} from "../users.models";

const ListTable = () => {
    const dispatch = useDispatch()
    const { users} = useSelector(
        (state: RootS) => state.users
    )
    useEffect(() => {
        const set=()=>{}
        if (users.length < 1) {
            dispatch(fetchUsers({}, set))
            // dispatch(LOG_g("questions", questions))
        }
        // Since we may have the issue already, ensure we're scrolled to the top
        window.scrollTo({top: 0})
    }, [dispatch, users])



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
            dataIndex: 'fullName',
            width: '40%',


        },

        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: UserModel) => {
                return (
                    <Space size={"middle"}>
                        <Typography.Link disabled={editModalOpen ===true} onClick={() => {
                            // message.info("hi");

                            dispatch(setUser(record));
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
            <AddEditUser isOpen={editModalOpen} onClose={()=>setEditModal(false)} isUpdate={true}/>


            {/*<AddQuestion id={editingKey} editMode={true} isOpen={modalOpen} onClose={()=>setModal(false)}/>*/}
            <Form form={form} component={false}>
                <Table
                   bordered
                    dataSource={users}
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


