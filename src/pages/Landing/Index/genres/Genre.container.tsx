import GenresComponent from "./Genres";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootS, RootState} from "../../../../app/rootReducer";
import {Query, Status} from "../../../../features/utils";
import {Form} from "antd";
import {ItemFilter} from "../../../../features/Item/itemModel";
import {fetchItems} from "../../../../features/Item/item.reducer";
import {fetchGenres} from "../../../../features/genres/genres.reducer";



const GenreContainer = () => {
    const dispatch = useDispatch();
    const { genres,genre, error, loadingStatus, queryType} = useSelector(
        (state:RootS) => state.genres
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


    const {filter} =useSelector(
        (state:RootS)=> state.items
    )
    let validQuery= !!(queryType === Query.CREATE || Query.UPDATE)
    let loading = loadingStatus === Status.LOADING && validQuery

    const setFilter=(id)=>{
        const set=()=>{}
            const query:ItemFilter= {
                // ...filter,
                genres: id,
                page:1,
                lastPageReached: false
            }
            dispatch(fetchItems(query, set))

    }
    return (
        <>
           <GenresComponent genres={genres} setFilter={setFilter}/>
        </>
    )
}
export default GenreContainer