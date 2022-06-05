
import {connect} from "react-redux";

import SideBar from "../Sidebar";
import {getSelectedFilterItems, getStatus} from "App/views/Admin/items/store/item_selector";

import {setCategory, setGeneralFilter, setGenres, setType} from "App/views/Admin/items/store/filter_Functions";
import * as Actions from "App/views/Admin/items/store/item_actions";
import {getCurrentPageItems} from "Store/Category/store/category_selectors";
import * as Selectors from "Store/Genres/store/genres.selectors";
import {MovieTypes} from "Store/IndexPage/itemsLatest/store/Types";




const mapDispatchToProps = dispatch => {
    return {
        selectItem: (item) => dispatch(Actions.selectItem(item)),
        setFilter: () => dispatch(setGeneralFilter("","",1)),
        setGenre: (id) => dispatch(setGenres(id)),
        setCategory: (id) => dispatch(setCategory(id)),
        setTypes: (id) => dispatch(setType(id)),
        dispatch
    }
}

const mapStateToProps = (state) => ({
    items: getSelectedFilterItems(state ),
    status:getStatus(state),
    genres:  Selectors.getCurrentPageItems(state),
    types:[{"id":MovieTypes.MOVIE, "name":MovieTypes.MOVIE},{"id":MovieTypes.SERIES, "name":MovieTypes.SERIES},{"id":MovieTypes.CONTINUAL, "name":MovieTypes.CONTINUAL}]
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideBar)
