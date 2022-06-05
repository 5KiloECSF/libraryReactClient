import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Table, Input, Popconfirm, Form, Typography, Space, Tag, Select, Alert, Avatar, message, Button} from 'antd';
import {RootS, RootState} from 'app/rootReducer';
import {fetchItems, updateItems, deleteItems} from "../item.reducer";

import AddEditBook from "./AddUpdate";
import {setItem} from '../item.reducer'

import {Query, Status} from "../../utils";
import {ItemModel} from "../itemModel";
import {fetchGenres} from "../../genres/genres.reducer";
import {ItemsAdminLimit} from "../../../Constants/constants";

const ItemListTable = () => {
    const dispatch = useDispatch()
    const [queryCtr, setQueryCtr]=useState(0)

    const { items, error, loadingStatus, queryType, filter} = useSelector(
        (state: RootS) => state.items
    )
    // @ts-ignore
    const { genres, error:genresError, loadingStatus:genresLoading, queryType:genresL} = useSelector(
        (state: RootState) => state.genres
    )
    useEffect(() => {
        const set=()=>{

        }
        if (items.length < 1 &&queryCtr<5) {
            dispatch(fetchItems({...filter,limit:ItemsAdminLimit},set ))
            setQueryCtr(queryCtr+1)
        }
        //To prevent multiple queries
        if (genres.length < 1&& queryCtr<5) {
            dispatch(fetchGenres())
            setQueryCtr(queryCtr+1)
        }
        // Since we may have the issue already, ensure we're scrolled to the top
        window.scrollTo({top: 0})
    }, [dispatch, items, genres])

    let validQuery= (queryType === Query.FETCH)
    let loadingData = loadingStatus === Status.LOADING && validQuery
    type alertType= "success" | "info" | "warning" | "error"
    const [alert, setAlert] = useState<{visible:boolean, message:string, type:alertType}>({visible:false, message:"",type:"success" });
    useEffect(() => {
        showAlertMessages(loadingStatus, queryType, setAlert)

        // Since we may have the issue already, ensure we're scrolled to the top
        window.scrollTo({top: 0})
        setTimeout(() => {
            setAlert({visible:false, ...alert});
        }, 6000);

    }, [dispatch, loadingStatus])
    const handleClose = () => {
        setAlert({...alert, visible: false});
    };



    const [form] = Form.useForm();
    const [editModalOpen, setEditModal]= useState(false);

    const Delete = (record) => {
        dispatch(deleteItems(record.id))
    };

    const columns = [
        {
            // title:'image',
            dataIndex:'image',
            render:image=>(
                <Avatar shape="square" size={70} src={image?image.imagePath +image.imageCover+image.suffix:"default.png"} />
            )
        },
         {
            title: 'name',
            dataIndex: 'name',
            width: '40%',

        },
        {
            title: 'amount',
            dataIndex: 'booksAmount'
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: ItemModel) => {
                return (
                    <Space size={"middle"}>
                        <Typography.Link disabled={editModalOpen ===true} onClick={() => {
                            message.info("hi");
                            // message.info(`ss-${JSON.stringify(record)}`);
                            // message.info(record);
                            dispatch(setItem(record));
                            // <Alert message="Success Text" type="success" />
                            setEditModal(true)
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
            <AddEditBook isOpen={editModalOpen} onClose={()=>setEditModal(false)} isUpdate={true}/>

            {alert.visible ? (
                <Alert message={alert.message} type={alert.type} closable afterClose={handleClose} />
            ) : null}
            {/*<AddQuestion id={editingKey} editMode={true} isOpen={modalOpen} onClose={()=>setModal(false)}/>*/}

            <Form form={form} component={false}>
                <Table
                   bordered
                    dataSource={items}
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

export default ItemListTable;



const showAlertMessages=(loadingStatus ,queryType, setAlert)=>{
    if (loadingStatus==Status.SUCCESS && queryType==Query.UPDATE) {
        setAlert({visible:true, type:"success", message:"update successful"})
    }else if (loadingStatus==Status.ERROR && queryType==Query.UPDATE) {
        setAlert({visible:true, type:"error", message:"update Error please try again"})
    }else if (loadingStatus==Status.SUCCESS && queryType==Query.CREATE) {
        setAlert({visible:true, type:"success", message:"create successful"})
    }else if (loadingStatus==Status.ERROR && queryType==Query.CREATE) {
        setAlert({visible:true, type:"error", message:"create Error"})
    }else if (loadingStatus==Status.SUCCESS && queryType==Query.DELETE) {
        setAlert({visible:true, type:"success", message:"deleted successfully"})
    }else if (loadingStatus==Status.ERROR && queryType==Query.DELETE) {
        setAlert({visible:true, type:"error", message:"delete Error"})
    }
}
