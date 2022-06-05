import {getAllPages, getSelectedItem} from "../../../../../Store/Groups/store/selectors";

import {connect} from "react-redux";
import Groups from "../Groups/Groups";
import {getFilter} from "../../../../../Store/Groups/store/selectors";
import _items from 'Data/mock/group.json'

const mapStateToProps = (state) => ({
    // groups:  getAllPages(state),
    groups:  _items,
    filter:  getFilter(state)
})

const mapDispatchToProps = dispatch => {
    return {
        setFilter: (id) => dispatch(getSelectedItem(id,1)),
        dispatch
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Groups)
