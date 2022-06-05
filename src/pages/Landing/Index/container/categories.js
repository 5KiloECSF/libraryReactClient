import {connect} from "react-redux";
//selector
// import {getCurrentPageItems} from "../../../../../Store/Category/store/category_selectors";
// action
import {setCategory, setGeneralFilter} from "../../../Admin/items/store/filter_Functions";
import Categories from "../components/Categories";

// import {ConfigT} from "../../../Admin/items/store/item_types";

import _category from 'Data/mock/categories.json'
const mapStateToProps = (state) => ({
    categories:  _category
    // categories:  getCurrentPageItems(state)
})

const mapDispatchToProps = dispatch => {
    return {
        setFilter: (id) => dispatch(setCategory(id)),
        dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Categories)