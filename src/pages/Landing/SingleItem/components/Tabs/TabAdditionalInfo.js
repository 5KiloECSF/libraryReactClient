import React from "react";

class TabAdditionalInfo extends React.Component {
  render() {
    return (
      <div id="tab_2" className="tab_container">
        <div className="row">
          <div className="col additional_info_col">
            <div className="tab_title additional_info_title">
              <h4>Additional Information</h4>
            </div>
            <p>
              COLOR:<span>Gold, Red</span>
            </p>
            <p>
              SIZE:<span>L,M,XL</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default TabAdditionalInfo;
