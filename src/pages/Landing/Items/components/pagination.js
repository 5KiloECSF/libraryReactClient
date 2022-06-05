import {Link} from "react-router-dom";
import React from "react";

export function Pagination({selectedConfig, prevPage, nextPage}) {
    let haveNextPage = selectedConfig.haveNextPage
    let havePreviousPage = selectedConfig.havePreviousPage
    let pageNo = selectedConfig.selectedPage

    return (
        <div className="product_sorting_container product_sorting_container_bottom clearfix">

            <div>

                {/*<ul className="product_sorting">*/}
                {/*  <li>*/}
                {/*    <span>Show:</span>*/}
                {/*    <span className="num_sorting_text">04</span>*/}
                {/*    <i className="fa fa-angle-down"/>*/}
                {/*    <ul className="sorting_num">*/}
                {/*      <li className="num_sorting_btn">*/}
                {/*        <span>01</span>*/}
                {/*      </li>*/}
                {/*      <li className="num_sorting_btn">*/}
                {/*        <span>02</span>*/}
                {/*      </li>*/}
                {/*      <li className="num_sorting_btn">*/}
                {/*        <span>03</span>*/}
                {/*      </li>*/}
                {/*      <li className="num_sorting_btn">*/}
                {/*        <span>04</span>*/}
                {/*      </li>*/}
                {/*    </ul>*/}
                {/*  </li>*/}
                {/*</ul>*/}
                {/*<span className="showing_results">Showing 1–3 of 12 results</span>*/}
                {/*pagination*/}
            </div>

            <div className="pages d-flex flex-row align-items-center">
                <div id="next_page_1" className="page_next">

                    <i hidden={!havePreviousPage} onClick={() => prevPage()} className="fa fa-long-arrow-left"
                       aria-hidden="true"/>

                </div>

                <div className="page_total">
                </div>

                <div className="page_current">
                    <span>{pageNo}</span>
                    <ul className="page_selection">
                        <li>
                            < Link to="#">1</Link>
                        </li>
                        <li>
                            < Link to="#">2</Link>
                        </li>
                        <li>
                            < Link to="#">3</Link>
                        </li>
                    </ul>
                </div>
                <div className="page_total">
                    {/*<span>of</span> 3*/}
                </div>
                <div id="next_page_1" className="page_next">

                    <i hidden={!haveNextPage} onClick={() => nextPage()} className="fa fa-long-arrow-right"
                       aria-hidden="true"/>

                </div>
            </div>
        </div>
    );
}