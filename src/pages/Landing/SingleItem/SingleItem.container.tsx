import {useDispatch, useSelector} from "react-redux";

import SingleItemPage from "./SingleItemPage";
import {RootS} from "../../../app/rootReducer";
import React, {useEffect, useState} from "react";
import {getItem, setId, setItem} from "../../../features/Item/item.reducer";

import {useParams, useLocation} from "react-router-dom";


const SingleItemContainer =()=> {



    const dispatch = useDispatch();
    const { item, error, loadingStatus, queryType} = useSelector(
        (state:RootS) => state.items
    )
    const { id } = useParams()

    const [queryCtr, setQueryCtr]=useState(0)

   useEffect(()=>{
       dispatch(setId(id))
   },[])

    useEffect(() => {
        console.log("`````````````22",item)
        const set=()=>{}
        if ( queryCtr<3) {
            console.log("dispatching", id)
            dispatch(getItem(id ))
            setQueryCtr(queryCtr+1)
        }
        // Since we may have the issue already, ensure we're scrolled to the top
        window.scrollTo({top: 0})
    }, [dispatch, item, item.id])

    return <SingleItemPage item={item}  />


}

export default SingleItemContainer;
