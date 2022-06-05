import {Col, Row, Button, Space, Typography, Divider, Tag} from "antd";
import { PlusCircleTwoTone} from "@ant-design/icons";
import ItemListTable from "./itemListTable";

import React, {useState} from "react";
import AddWithImage from "./AddUpdate";

import FilterDrawer from './filter'
import {Query, Status} from "../../utils";
import {useDispatch, useSelector} from "react-redux";
import {RootS} from "../../../app/rootReducer";
import {ItemFilter} from "../itemModel";
import {fetchItems} from "../item.reducer";

export const ItemDashboard=() =>{
    const [modalOpen, setModal]= useState(false);

    const dispatch = useDispatch();
    const { items, error, loadingStatus, queryType, filter} = useSelector(
        (state: RootS) => state.items
    )

    const loadMore=()=>{
        if(filter.lastPageReached) return
        const set=()=>{}
        const query:ItemFilter= {
            ...filter,
            page:filter.page +1,
            lastPageReached: filter.lastPageReached
        }

            // setImageForm({...imageForm, file2: info.file, fileList2: info.fileList})
        dispatch(fetchItems(query, set, false))
        window.scrollTo({top: 0})
    }

    let validQuery= (queryType === Query.FETCH)
    let loadingData = loadingStatus === Status.LOADING && validQuery

    return <div style={{margin: "0 16px"}}>

            <Row justify="space-between" align="stretch" >
                <Col>
                    <h2>Books</h2>
                </Col>
                <Divider orientation="right">
                    <Col>
                    <Button
                        type="default"
                        style={{ width: "150px" }}
                        onClick={() => setModal(true)}
                    >
                        <PlusCircleTwoTone />
                        Add Book
                    </Button>
                </Col></Divider>


            </Row>



        <AddWithImage isOpen={modalOpen} onClose={() => setModal(false)} isUpdate={false}/>
        <Row justify="space-between">

                <Col>
                    <FilterDrawer  />
                </Col>
            <Col>
                <Tag closable onClose={()=>console.log("hey")}>
                    Tag 2
                </Tag>
                 <Tag closable onClose={()=>console.log("hey")}>
                    Tag 2
                </Tag>
                 <Tag closable onClose={()=>console.log("hey")}>
                    Tag 2
                </Tag>


            </Col>

        </Row>

        <Space>
            <Divider orientation="right">
                </Divider>
        </Space>
        <Row>
            <Col span="4"/>
            <Col span="16">
                <ItemListTable/>


                <Row justify="center"  style={{"display":"flex"}}>
                    <Button type="primary" size="small" onClick={loadMore}  disabled={loadingData ||filter.lastPageReached} loading={loadingData}>
                        Load More
                    </Button>
                </Row>
            </Col>

            <Col span="4"/>
        </Row>
    </div>;
}