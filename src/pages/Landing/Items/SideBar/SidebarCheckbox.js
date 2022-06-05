import React from "react";

class SidebarCheckbox extends React.Component {
  render() {
    return (
      <div className="sidebar_section">
        <div className="sidebar_title">
          <h5>Sizes</h5>
        </div>
        <ul className="checkboxes">
          <li>
            <i className="fa fa-square-o" aria-hidden="true" />
            <span>S</span>
          </li>
          <li className="active">
            <i className="fa fa-square" aria-hidden="true" />
            <span>M</span>
          </li>
          <li>
            <i className="fa fa-square-o" aria-hidden="true" />
            <span>L</span>
          </li>
          <li>
            <i className="fa fa-square-o" aria-hidden="true" />
            <span>XL</span>
          </li>
          <li>
            <i className="fa fa-square-o" aria-hidden="true" />
            <span>XXL</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default SidebarCheckbox;
