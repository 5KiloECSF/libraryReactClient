import React from "react";
import MovieTypesTopButtons from "./MovieTypesTopButtons";
import NewArrivalsRow from "./NewArrivalsRow";
import {Link} from "react-router-dom";

function NewArrivals ({selectItem, setFilter, items}) {

    return (
      <div className="new_arrivals">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <div className="section_title new_arrivals_title">
                <h2>Movie Types</h2>
              </div>
            </div>
          </div>
          <MovieTypesTopButtons setFilter={setFilter}/>
          <NewArrivalsRow selectItem={selectItem} items={items}/>

          <div style={{left: '50%', marginLeft: '-20'}}>

          <Link style={{marginLeft: 'auto',marginRight: 'auto'}} to="/items">

          <button

              id="newsletter_submit"
              type="submit"
              className="newsletter_submit_btn trans_300 text-center"
              value="Submit"
          >
              View more
          </button>
          </Link>
          </div>
        </div>

      </div>
    );

}

export default NewArrivals;
