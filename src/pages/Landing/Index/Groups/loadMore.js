import React from "react";
import {connect} from "react-redux";


import { NextPage, PrevPage } from "../../../../../Store/Groups/store/functions";

 const LoadMore=({ filter, NextPage}) =>{
     let haveNextPage = filter.haveNextPage

    return <div className="d-block text-center card-footer">
        <button
            disabled={!haveNextPage}
            onClick={()=>NextPage()}
            id="newsletter_submit"
            type="submit"
            className="newsletter_submit_btn trans_300"
            value="Submit"
        >
            {haveNextPage&&"Load More"}
        </button>

        {/*<button className="btn-wide btn btn-success">Save</button>*/}
    </div>;
}



export default connect(
    null,
    { NextPage, PrevPage}
)(LoadMore)