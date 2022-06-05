import React from "react";
import {connect} from "react-redux";
import * as types from "../../../Admin/items/store/item_types";
import {Pagination} from "../components/pagination";
import {paginateItems} from "../../../Admin/items/store/items_repo";
import {getFilter} from "../../../Admin/items/store/item_selector";


const mapStateToProps = (state) => ({
  selectedConfig:  getFilter(state)
})


export default connect(
    mapStateToProps,
    {prevPage:()=>paginateItems(types.PREVIOUS_PAGE), nextPage:()=>paginateItems(types.ITEMS_NEXT_PAGE)}
)(Pagination);