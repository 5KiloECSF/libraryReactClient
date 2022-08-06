import React from "react";
import {Link} from "react-router-dom";

import {LocalImg} from "../../../../../Constants/constants";
class Banner extends React.Component {
  render() {
    return (
      <div
        className="main_slider"
        style={{
          backgroundImage: `url(${LocalImg("bookClub.jpg")})`
        }}
      >
        <div className="container fill_height">
          <div className="row align-items-center fill_height">
            <div className="col">
              <div className="main_slider_content">
                <p>A reader lives a thousand lives before he dies.<br/>  The man who never reads lives only one!  </p>


              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Banner;
