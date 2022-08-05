import React from "react";
import {Link} from "react-router-dom";
class Breadcrumbs extends React.Component {
  render() {
    return (
      <div className="breadcrumbs d-flex flex-row align-items-center">
        <ul>
          <li>
            < Link to="index.html">Home</Link>
          </li>
          <li>
            < Link to="groups.html">
              <i className="fa fa-angle-right" aria-hidden="true" />

            </Link>
          </li>
          <li className="active">
            < Link to="#">
              <i className="fa fa-angle-right" aria-hidden="true" />
              Single Book
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Breadcrumbs;
