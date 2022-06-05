import React from "react";
import {Link} from "react-router-dom";
class CopyRight extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="footer_nav_container">
            <div className="cr">
              ©2018 All Rights Reserverd. This template is made with{" "}
              <i className="fa fa-heart-o" aria-hidden="true" /> by{" "}
              < Link to="#">Colorlib</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CopyRight;
