import React from "react";

class TabsTopSelection extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <div className="tabs_container">
            <ul className="tabs d-flex flex-sm-row flex-column align-items-left align-items-md-center justify-content-center">
              <li className="tab active" data-active-tab="tab_1">
                <span>Description</span>
              </li>
              <li className="tab" data-active-tab="tab_2">
                <span>Additional Information</span>
              </li>
              <li className="tab" data-active-tab="tab_3">
                <span>Reviews (2)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TabsTopSelection;
