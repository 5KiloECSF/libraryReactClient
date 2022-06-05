import {Link} from "react-router-dom";
import React from "react";

export function ProductSorting() {
    return (
        <div className="product_sorting_container product_sorting_container_top">
            <ul className="product_sorting">
                <li>
                    <span className="type_sorting_text">Default Sorting</span>
                    <i className="fa fa-angle-down"/>
                    <ul className="sorting_type">
                        <li className="type_sorting_btn">
                            <span>Default Sorting</span>
                        </li>
                        <li className="type_sorting_btn">
                            <span>Price</span>
                        </li>
                        <li className="type_sorting_btn">
                            <span>Product Name</span>
                        </li>
                    </ul>
                </li>
                <li>
                    <span>Show</span>
                    <span className="num_sorting_text">6</span>
                    <i className="fa fa-angle-down"/>
                    <ul className="sorting_num">
                        <li className="num_sorting_btn">
                            <span>6</span>
                        </li>
                        <li className="num_sorting_btn">
                            <span>12</span>
                        </li>
                        <li className="num_sorting_btn">
                            <span>24</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <div className="pages d-flex flex-row align-items-center">

                <div className="page_current">
                    <span>1</span>
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
                    <span>of</span> 3
                </div>
                <div id="next_page" className="page_next">
                    < Link to="#">
                        <i className="fa fa-long-arrow-right" aria-hidden="true"/>
                    </Link>
                </div>
            </div>
        </div>
    );
}