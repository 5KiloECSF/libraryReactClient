import React from "react";
import { Card} from 'antd';

import {Link} from "react-router-dom";
import ApiService from "../../../api/api.service";
import {useInView} from "react-intersection-observer";
import {useInfiniteQuery} from "@tanstack/react-query";
import {setItem} from "../../../features/Item/item.reducer";
import {useDispatch} from "react-redux";
import {BookItems} from "./availableBooks";

const availableLimit=7;
const getLatestBooks = async ({pageParam = 1}) => {
    const books = await ApiService.query(`books?limit=${availableLimit}&page=${pageParam}`, {});
    return books.data.value;
};
function Latest() {

    const dispatch = useDispatch();
    const {ref, inView} = useInView()
    const {isLoading,isError,data,error,isFetching,isFetchingNextPage,fetchNextPage,hasNextPage} = useInfiniteQuery(
        ['latest'],
        getLatestBooks,
        {
            // getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
            getNextPageParam: (lastPage, pages) => {
                if(lastPage.length<availableLimit){
                    return undefined
                }
                return pages.length +1
            },
        },
    )
    React.useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])

    const selectItem=(item)=>{
        dispatch(setItem(item))
    }


    // const hasItems = bestItems !== undefined && bestItems.length > 0;
    // const node = hasItems ? bestItems.map(item =>
    //     // <Col >
    //     <Cards
    //         selectItem={() => selectItem(item)}
    //         key={item.id}
    //         item={item}
    //     />
    //
    // ) : "no books"
    const myContainerStyle = {
        width:'100%',
        height:"25em",
        // overflowY: 'auto',
        overflowX: 'auto',
        display:'flex',
        // overflow:'auto'
        // justifyContent:"space-between",
        // flexWrap:'nowrap'
    }

    return (
        <div className="">
            {/*<div className="">*/}

                <div className="row">
                    <div className="col text-center">
                        <div className="section_title new_arrivals_title">
                            <h2>Latest </h2>
                        </div>
                    </div>
                </div>

                <div className="flex  space-x-4 overflow-y-hidden overflow-x-auto h-72"  >

                    {/*{node}*/}
                    {
                        isLoading ? (
                            "Loading..."
                        ) : isError ? (
                            // @ts-ignore
                            <span>Error: {error.message}</span>
                        ) : (
                            <>


                                {data.pages.map((page) => (
                                    <>
                                        {
                                            page.map((book) => (
                                                <Cards
                                                    key={book.id}
                                                    // book={book}
                                                    selectItem={() => selectItem(book)}
                                                    item={book}
                                                />
                                            ))
                                        }
                                    </>

                                ))}
                                <div>
                                    <button
                                        ref={ref}
                                        onClick={() => fetchNextPage()}
                                        disabled={!hasNextPage || isFetchingNextPage}
                                    >
                                        {isFetchingNextPage
                                            ? 'Loading more...'
                                            : hasNextPage
                                                ? 'Load Newer'
                                                : 'Nothing more to load'}
                                    </button>
                                </div>
                                <div>
                                    {isFetching && !isFetchingNextPage
                                        ? 'Background Updating...'
                                        : null}
                                </div>
                            </>
                        )
                    }


                </div>

        </div>
    );

}

export default Latest;
const myComponentStyle = {

    width: "300",
    marginRight: '1.5em',
}
const imgStyles = {

    width: "100%",
    marginRight: '0.5em',
}
function Cards({item, selectItem}){
    return(
        <Card
            hoverable
            style={myComponentStyle}
            cover={
                < Link onClick={() => selectItem()} to={`single/${item.id}`}>
                    <img  alt="example" src={item.poster} style={imgStyles}/>
                </Link>
                    }
         >
            < Link onClick={() => selectItem()} to={`single/${item.id}`}>
                <Card.Meta title={item.name} description={" "} />

            </Link>

        </Card>
    )

}

function BestSellersItem({item, selectItem}) {
    return (
        <div className="owl-item product_slider_item card-item" style={myComponentStyle}>
            <div className="item-item" style={{width: "100%"}}>
                <div className="item discount">
                    <Link onClick={() => selectItem()} to={`single/${item.id}`}>
                        <div className="product_image">

                            <img src={item.poster} alt=""/>
                        </div>
                    </Link>

                    <div className="favorite favorite_left"/>
                    <div
                        className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
                        <span>{item.page_size}</span>
                    </div>
                    <div className="product_info">

                        <h6 className="product_name">
                            < Link onClick={() => selectItem()} to={`single/${item.id}`}>
                                {item.name}
                            </Link>
                        </h6>
                        <div className="product_price">
                            {/*$520.00<span>$590.00</span>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
