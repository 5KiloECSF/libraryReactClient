import React from "react";

class SidebarColor extends React.Component {
  render() {
    return (
      <div className="sidebar_section">
        <div className="sidebar_title">
          <h5>Color</h5>
        </div>
        <ul className="checkboxes">
          <li>
            <i className="fa fa-square-o" aria-hidden="true" />
            <span>Black</span>
          </li>
          <li className="active">
            <i className="fa fa-square" aria-hidden="true" />
            <span>Pink</span>
          </li>
          <li className="active">
            <i className="fa fa-square-o" aria-hidden="true" />
            <span>White</span>
          </li>
          <li>
            <i className="fa fa-square-o" aria-hidden="true" />
            <span>Blue</span>
          </li>
          <li>
            <i className="fa fa-square-o" aria-hidden="true" />
            <span>Orange</span>
          </li>
          <li>
            <i className="fa fa-square-o" aria-hidden="true" />
            <span>White</span>
          </li>
          <li>
            <i className="fa fa-square-o" aria-hidden="true" />
            <span>Blue</span>
          </li>
          <li>
            <i className="fa fa-square-o" aria-hidden="true" />
            <span>Orange</span>
          </li>
          <li>
            <i className="fa fa-square-o" aria-hidden="true" />
            <span>White</span>
          </li>
          <li>
            <i className="fa fa-square-o" aria-hidden="true" />
            <span>Blue</span>
          </li>
          <li>
            <i className="fa fa-square-o" aria-hidden="true" />
            <span>Orange</span>
          </li>
        </ul>
        <div className="show_more">
          <span>
            <span>+</span>Show More
          </span>
        </div>
      </div>
    );
  }
}

export default SidebarColor;
