import * as Actions from "../../../Admin/items/store/item_actions";
import {setLatestGeneralFilter} from "../../../../../Store/IndexPage/itemsLatest/store/filterFunctions";
import {getSelectedFilterItems} from "../../../../../Store/IndexPage/itemsLatest/store/selector";
import {connect} from "react-redux";
import NewArrivals from "../Types/NewArrivals";
import _items from 'Data/mock/items.json'


const mapDispatchToProps = dispatch => {
    return {
        selectItem: (item) => dispatch(Actions.selectItem(item)),
        setFilter: () => dispatch(setLatestGeneralFilter),
        dispatch
    }
}

const mapStateToProps = state => ({
    items: getSelectedFilterItems(state ),
    // items:_items,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewArrivals)