import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootS} from "../../../app/rootReducer";
// import {Query, Status} from "../../../../features/utils";
import {ItemFilter} from "../../../features/Item/itemModel";
import {fetchItems} from "../../../features/Item/item.reducer";
import {fetchGenres} from "../../../features/genres/genre.reducer";

import {Link} from "react-router-dom";


const GenreContainer = () => {
    const dispatch = useDispatch();
    const {genres} = useSelector(
        (state: RootS) => state.genres
    )
    const [queryCtr, setQueryCtr] = useState(0)
    useEffect(() => {
        if (genres.length < 1 && queryCtr < 5) {
            dispatch(fetchGenres())
            setQueryCtr(queryCtr + 1)
            // dispatch(LOG_g("questions", questions))
        }
        // Since we may have the issue already, ensure we're scrolled to the top
        window.scrollTo({top: 0})
    }, [dispatch, genres])


    // const {filter} =useSelector(
    //     (state:RootS)=> state.items
    // )
    // let validQuery= !!(queryType === Query.CREATE || Query.UPDATE)
    // let loading = loadingStatus === Status.LOADING && validQuery

    const setFilter = (id) => {
        const set = () => {
        }
        const query: ItemFilter = {
            // ...filter,
            genres: id,
            page: 1,
            lastPageReached: false
        }
        dispatch(fetchItems(query, set))

    }
    const gen=[
        {id:1, name:"one", poster:"https://picsum.photos/id/1000/300/300"},
        {id:2, name:"one", poster:"https://picsum.photos/id/1000/300/300"},
        {id:3, name:"one", poster:"https://picsum.photos/id/1000/300/300"},
        {id:4, name:"one", poster:"https://picsum.photos/id/1000/300/300"},

    ]
    return (
        <div className=" m-2 px-6 mx-4">

            <div className="mx-auto flex flex-col items-center  justify-center h-full">
                <h2> Genres</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 justify-center  lg:grid-cols-7 gap-8">
                    {
                        genres.map(genre =>
                            <GenresItem
                                key={genre.id}
                                genre={genre}
                                setFilter={setFilter}
                            />
                        )
                    }{
                        gen.map((g, i) =>
                            <GenresItem
                                key={g.id}
                                genre={g}
                                setFilter={setFilter}
                            />
                        )
                    }

                </div>
            </div>
        </div>
    )
}

const GenresItem = ({genre, setFilter}) => {
    return (

        <>
            <Link onClick={() => setFilter(genre.id)} to={"/items"}>
                <div className="p-1 flex flex-col items-center  rounded-xl justify-center  items-center hover:shadow-lg ease-in duration-300">
                    <img
                        className=" p-1 shadow-xl shadow-gray-400 rounded-full hover:scale-110 ease-in duration-300 catagory-im"
                        src={genre.poster} alt=""/><br/>
                    <span className="">{genre.name}</span>

                </div>
            </Link>
        </>


    )
}
export default GenreContainer