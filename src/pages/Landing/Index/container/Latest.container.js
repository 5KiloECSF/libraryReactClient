import {connect} from "react-redux";

// import * as Selectors from "../../../../../Store/IndexPage/itemsBest/store/selectors";
// import {NextPage, PrevPage} from "../../../../../Store/IndexPage/itemsBest/store/functions";
// import {} from "../../../../Store/IndexPage/itemsBest/Store/actions";
import BestItemSlider from "../Best/Best"
import _items from 'Data/mock/latest.json'
import * as Actions from "../../../Admin/items/store/item_actions";


const mapStateToProps = state => ({
    // currentPageItems: Selectors.getCurrentPageItems(state),
    currentPageItems: _items,
    status: Selectors.getStatus(state),
    filter: Selectors.getFilter(state)
});

const mapDispatchToProps = dispatch => {
    return {
        selectItem: (item) => dispatch(Actions.selectItem(item)),
        // NextPage: () => dispatch(NextPage()),
        // PrevPage: () => dispatch(PrevPage()),
        dispatch
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BestItemSlider)