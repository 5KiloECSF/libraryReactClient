import React, {useEffect, useState} from "react";

import Best from "./Best";
import {useDispatch, useSelector} from "react-redux";
import {RootS} from "../../../../app/rootReducer";
import {ItemFilter} from "../../../../features/Item/itemModel";
import {fetchItems, fetchLatestItems, setItem} from "../../../../features/Item/item.reducer";
import {ItemsAdminLimit, ItemsLatestLimit} from "../../../../Constants/constants";
// import {fetchGenres} from "../../../../features/genres/genres.reducer";

const BestContainer =()=> {

    const dispatch = useDispatch();
    const { latestItems,item, error, loadingStatus, queryType, filter} = useSelector(
        (state:RootS) => state.items
    )

    const [queryCtr, setQueryCtr]=useState(0)
    useEffect(() => {
        const set=()=>{}
        if (latestItems.length < 1 &&queryCtr<5) {
            dispatch(fetchLatestItems({...filter,limit:ItemsLatestLimit} ))
            setQueryCtr(queryCtr+1)
        }
        // Since we may have the issue already, ensure we're scrolled to the top
        window.scrollTo({top: 0})
    }, [dispatch, latestItems])


    const selectItem=(item)=>{
        dispatch(setItem(item))
    }
    return (
          <Best bestItems={latestItems} filter={filter} selectItem={selectItem} />
    );

}

export default BestContainer;
