import React, {useEffect, useState} from "react";

import {Link} from "react-router-dom";
import Item from "./components/Item";
import Pagination from "./container/pagination.container";
import {useDispatch, useSelector} from "react-redux";
import {RootS} from "../../../app/rootReducer";
import {fetchItems, setItem} from "../../../features/Item/item.reducer";
import {ItemsAdminLimit, ItemsListPageLimit} from "../../../Constants/constants";
import {fetchGenres} from "../../../features/genres/genres.reducer";
import {Col, Row} from "antd";
// import {ProductSorting} from "./components/product sorting";

const MainContent = () => {
    // useEffect(() => {
    //     setFilter()
    // }, [])
    const dispatch = useDispatch()
    const [queryCtr, setQueryCtr]=useState(0)
    const { items, filter} = useSelector(
        (state: RootS) => state.items
    )
    useEffect(() => {
        const set=()=>{}
        if (items.length < 1 &&queryCtr<5) {
            dispatch(fetchItems({...filter, limit:ItemsListPageLimit},set ))
            setQueryCtr(queryCtr+1)
        }
        window.scrollTo({top: 0})
    }, [dispatch, items])

    const selectItem=(item)=>{
        dispatch(setItem(item))
    }

    const hasBooks = items !== undefined && items.length > 0;
    const nodes = hasBooks ? (
        items.map(item =>
            <Item
                key={item.id}
                item={item}
                selectItem={() => selectItem(item)}
            />
        )
    ) : (
        <div><Link to="/"><em>no Items in this page. Go back To main Page</em></Link></div>
    )
    return (
        <div className="main_content">
        {/*//     <div className="products_iso">*/}
        {/*        <div className="row">*/}
                    {/*<div className="col">*/}
                        {/*<ProductSorting/>*/}
                        {/*<div className="item-grid"*/}
                        {/*     style={{display: "flex", flexWrap: "wrap", justifyContent: "center"*/}
                        {/*     }}*/}
                        {/*>*/}

                        {/*    {nodes}*/}
                        {/*</div>*/}
                        <Row gutter={[16, 24]}>
                            {nodes}

                        </Row>
                        {/*<Pagination/>*/}
                    {/*</div>*/}
                {/*</div>*/}
            {/*</div>*/}
        </div>
    );

}

export default MainContent;
