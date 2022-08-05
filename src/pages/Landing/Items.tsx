import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Form, Radio, Select, Switch} from 'antd';
import {useLocation, useHistory} from "react-router-dom";

import ApiService from "../../api/api.service";
import {useInView} from "react-intersection-observer";
import {useInfiniteQuery} from "@tanstack/react-query";
import {BookItems} from "./Index/availableBooks";
import {RemoveEmptyFields} from "../../features/utils";
import {colors, log_Fun} from "../../utils/log";

import {RootS} from "../../app/rootReducer";
import {fetchGenres} from "../../features/genres/genre.reducer";

const availableLimit = 15;



function SideBar({setFilter}) {
    const [value, setValue] = useState(1);
    const [switc, setSwitch] = useState(false);
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
        setFilter({})
        history.replace({ pathname: location.pathname, search: "" });
    };

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const onSwitchChange = (e) => {
        console.log('switch checked', e);
        setSwitch(e);
    };

    const history = useHistory();
    const location = useLocation();
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
    const handleSubmit = (values) => {
        const query= {
            language: values.language,
            type: values.type,
            genres: values.genres,
            available: values.available
        }
        const newQuery=RemoveEmptyFields(query)
        // log_Fun("query", query, colors.FgRed )
        // log_Fun("newQuery",newQuery, colors.FgGreen)

        setFilter(newQuery)

        const queryString = new URLSearchParams(newQuery).toString()
        history.replace({ pathname: location.pathname, search: queryString });


    }

    return <div className=" items-end space-x-4 flex justify-center lg:justify-start lg:flex-col border-r-2 space-y-3 lg:w-1/5 lg:px-2 lg:space-y-2">

        <div className="lg:fixed lg:pl-4">
            <Form
                form={form}
            name="basic"
            // labelCol={{span: 8}}
            // wrapperCol={{span: 16}}
            // initialValues={{ remember: true }}
            onFinish={handleSubmit}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

                <Form.Item label={"Genres"} rules={[]} name="genres">
                    <Select
                        // mode="multiple"
                        // allowClear
                        style={{ width: '100%' }}
                        placeholder="Genres"
                        // defaultValue={['a10', 'c12']}
                        // onChange={handleChange}
                    >
                        {genres.map(genre=>{
                            return <Select.Option key={genre.id} value={genre.id} >{genre.name}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
            <Form.Item valuePropName="checked"
                label="only available"
                name="available"
            >
                <Switch checked={switc} onChange={onSwitchChange} />
            </Form.Item>

            {/*------- language -------*/}
            <Form.Item
                label="language"
                name="language"
                wrapperCol={{offset: 1, span: 16}}>
                <div className="flex lg:flex-col">
                    <Radio.Group onChange={onChange} value={value}>
                    <Radio value={""}>All</Radio>
                    <Radio value={"amharic"}>Amharic</Radio>
                    <Radio value={"english"}>English</Radio>

                </Radio.Group></div>
            </Form.Item>
            {/* ------- Type */}
            <Form.Item   wrapperCol={{offset: 0, span: 24}} label="Type" name="type">
                <Radio.Group size={"small"}>
                    <Radio.Button  style={{marginRight:"4px"}} value="secular">Secular</Radio.Button>
                    <Radio.Button value={"spiritual"}>Spiritual</Radio.Button>

                </Radio.Group>
            </Form.Item>



            <Form.Item wrapperCol={{offset: 4, span:20 }}>
                <Button size={"small"} className="mr-4" htmlType="button" onClick={onReset}>
                    Reset
                </Button>
                <Button size={"small"} type="primary" htmlType="submit">
                    Filter
                </Button>
            </Form.Item>
        </Form></div>




    </div>;
}


const Items = () => {
    const {ref, inView} = useInView()

    const [filter, setFilter] = useState({})
    const search = useLocation().search;
    // const name = new URLSearchParams(search).get('name');
    // const id = new URLSearchParams(search).get('id');
    // console.log("nameParams--", name)
    // console.log("idParams--", id)
    // console.log("search--", search)

    const {isLoading,isError,data,error,isFetching,isFetchingNextPage,fetchNextPage,hasNextPage, refetch } = useInfiniteQuery(
        ['items', filter],
        async ({ pageParam = 1 }) => {
            // const newQuery=RemoveEmptyFields(filter)
            const queryString = new URLSearchParams(search).toString()
            log_Fun("qStr", queryString)
            const res = await ApiService.query(`books?limit=${availableLimit}&page=${pageParam}&${queryString}`, {})
            return res.data.value
        },
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
    useEffect(() => {
        refetch()
    }, [filter])

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
                    <SideBar setFilter={setFilter} />

                    <div className="mt-6 lg:mt-0 lg:px-2 lg:w-4/5 ">
                        {/*----------  sort items --------*/}
                        <>
                            {/*<div className="flex items-center justify-between text-sm tracking-widest uppercase ">*/}
                            {/*    <p className="text-gray-500 dark:text-gray-300">6 Items</p>*/}
                            {/*    <div className="flex items-center">*/}
                            {/*        <p className="text-gray-500 dark:text-gray-300">Sort</p>*/}
                            {/*        <select*/}
                            {/*            className="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none">*/}
                            {/*            <option value="#">latest</option>*/}
                            {/*            <option value="#">name</option>*/}
                            {/*            <option value="#">Price</option>*/}
                            {/*        </select>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </>


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
