import React from "react";
import {BsBookFill} from "react-icons/bs";
import {useInfiniteQuery} from "@tanstack/react-query";
import {useInView} from 'react-intersection-observer'
import ApiService from "../../../api/api.service";

const availableLimit=15;
const getbooks = async ({pageParam = 1}) => {
    const books = await ApiService.query(`books?limit=${availableLimit}&page=${pageParam}&available=true`, {});
    return books.data.value;
};
const AvailableBooks = () => {
    const {ref, inView} = useInView()

    const {isLoading,isError,data,error,isFetching,isFetchingNextPage,fetchNextPage,hasNextPage} = useInfiniteQuery(
        ['available'],
        getbooks,
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

    // const {isLoading,  isError, error, data} = useQuery(['available'], getbooks)
    console.log("data===", data)
    console.log("error===", error)
    // @ts-ignore
    return (
        <div className="w-full  p-2 mt-20">
            <div className="max-w-[1240px] mx-auto flex flex-col  justify-center items-center h-full">
                <p className="text-xl tracking-widest uppercase text-[#5651e5]">Available Books</p>
            </div>
            <div className="mx-2 px-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/*Items*/}
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
                                            <BookItems book={book}/>
                                        ))
                                    }
                                </>

                            ))}

                            <div>
                                {isFetching && !isFetchingNextPage
                                    ? 'Background Updating...'
                                    : null}
                            </div>
                        </>
                    )
                }

            </div>
            <div>
                <button
                    className="bg-red-400"
                    ref={ref}
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage
                        ? 'Loading more...'
                        : hasNextPage
                            ? 'Load Newer'
                            : '---'}
                </button>
            </div>
        </div>
    );
};

export default AvailableBooks;

export function BookItems({book}) {
    return <div className=" h-96 border-r-4 shadow-sm hover:shadow-xl hover:scale-105 ease-in duration-300">
        {/*Image*/}
        <div className="w-full h-4/6">

            <img className="w-full h-full  shadow-xl rounded-xl"
                 src={book.poster}
                 alt=""/>
        </div>
        {/*title*/}
        <div className="mx-3 mt-3 flex flex-col md:flex-row  justify-between items-baseline">
            <p>{book.name} </p>
            <div className="px-2 rounded-xl text-white text-sm bg-gradient-to-r from-[#4a489a] to-[#709dff]">
                {book.type}
            </div>
        </div>
        <div className="m-3 flex justify-content-center  items-baseline">
            <div className="px-2 mt-1 self-baseline"><BsBookFill/></div>
            <p>
                {book.pageNo} pages
            </p>
        </div>

    </div>;
}

// const AvailableBooks = () => {
//
// }
