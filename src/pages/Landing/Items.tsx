import React, {useState} from "react";
import {Radio, Switch, Form, Button} from 'antd';


import ApiService from "../../api/api.service";
import {useInView} from "react-intersection-observer";
import {useInfiniteQuery} from "@tanstack/react-query";
import {BookItems} from "./Index/availableBooks";

const availableLimit = 15;
const getbooks = async ({pageParam = 1}) => {
    const books = await ApiService.query(`books?limit=${availableLimit}&page=${pageParam}`, {});
    return books.data.value;
};


function SideBar() {
    const [value, setValue] = useState(1);
    const [enabled, setEnabled] = useState(false)
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return <div className=" items-end space-x-4 flex justify-center lg:justify-start lg:flex-col border-r-2 space-y-3 lg:w-1/5 lg:px-2 lg:space-y-2">

        <div className="lg:fixed lg:pl-4"><Form
            name="basic"
            // labelCol={{span: 8}}
            // wrapperCol={{span: 16}}
            // initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}


            autoComplete="off"
        >
            <Form.Item
                label="only available"
                name="available"
            >
                <Switch defaultChecked/>
            </Form.Item>

            {/*------- language -------*/}
            <Form.Item
                label="language"
                name="language"
                wrapperCol={{offset: 1, span: 16}}>
                <div className="flex lg:flex-col">
                    <Radio.Group onChange={onChange} value={value}>
                    <Radio value={1}>All</Radio>
                    <Radio value={3}>Amharic</Radio>
                    <Radio value={2}>English</Radio>

                </Radio.Group></div>
            </Form.Item>
            {/* ------- Type */}
            <Form.Item   wrapperCol={{offset: 0, span: 24}} label="Type" name="type">
                <Radio.Group size={"small"}>
                    <Radio.Button  style={{marginRight:"4px"}} value="optional">Secular</Radio.Button>
                    <Radio.Button value>Spiritual</Radio.Button>

                </Radio.Group>
            </Form.Item>



            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Filter
                </Button>
            </Form.Item>
        </Form></div>




    </div>;
}


const Items = () => {
    const {ref, inView} = useInView()
    const {
        isLoading,
        isError,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(
        ['available'],
        getbooks,
        {
            // getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.length < availableLimit) {
                    return undefined
                }
                return pages.length + 1
            },
        },
    )
    React.useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView])

    return (


        <>

            <div className="bg-white my-20 dark:bg-gray-900">
                <div className="px-4 py-8 lg:flex lg:-mx-0">

                    {/*--------  Side bar --------*/}
                    <SideBar />

                    <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
                        {/*----------  sort items --------*/}
                        <div className="flex items-center justify-between text-sm tracking-widest uppercase ">
                            <p className="text-gray-500 dark:text-gray-300">6 Items</p>
                            <div className="flex items-center">
                                <p className="text-gray-500 dark:text-gray-300">Sort</p>
                                <select
                                    className="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none">
                                    <option value="#">latest</option>
                                    <option value="#">name</option>
                                    <option value="#">Price</option>
                                </select>
                            </div>
                        </div>

                        {/*---- items Container*/}
                        <div className="w-full  p-2 mt-20">
                            {/*-----------  list of items*/}
                            <div
                                className="mx-2 px-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                            {/*--- load more button*/}
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
                        </div>
                    </div>

                </div>
            </div>
            {/*// <div className="container product_section_container">*/}
            {/*//   <div className="row">*/}
            {/*//     <div className="col product_section clearfix">*/}
            {/*//       /!*<Breadcrumbs/>*!/*/}
            {/*//       {}*/}
            {/*//       /!*<Sidebar/>*!/*/}
            {/*//       {}*/}
            {/*//       <MainContent*/}
            {/*//*/}
            {/*//       />*/}
            {/*//     </div>*/}
            {/*//   </div>*/}
            {/*// </div>*/}
        </>


    );
}


export default Items;
