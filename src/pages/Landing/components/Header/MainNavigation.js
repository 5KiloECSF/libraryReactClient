import React from "react";
import {Link} from "react-router-dom";

class MainNavigation extends React.Component {
  render() {
    return (
      <div className="main_nav_container">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-right">
              <div className="logo_container">
                <Link to="/">
                  My <span>Movies</span>
                </Link>
              </div>
              <nav className="navbar">
                <ul className="navbar_menu">

                  <li>
                    <Link to="/">home</Link>
                  </li>

                  {/*<li>*/}
                  {/*  <Link to="/items">shop</Link>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*  <Link to="#">promotion</Link>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*  <Link to="#">pages</Link>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*  <Link to="#">blog</Link>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*  <Link to="/">contact</Link>*/}
                  {/*</li>*/}
                </ul>
                <ul className="navbar_user">
                  {/*<li>*/}
                  {/*  <Link to="#">*/}
                  {/*    <i className="fa fa-search" aria-hidden="true" />*/}
                  {/*  </Link>*/}
                  {/*</li>*/}

                  <li>
                    <Link to="/admin" >
                      <i className="fa fa-user" aria-hidden="true" />
                    </Link>
                  </li>

                  {/*<li className="checkout">*/}
                  {/*  <Link to="#">*/}
                  {/*    <i className="fa fa-shopping-cart" aria-hidden="true" />*/}
                  {/*    <span id="checkout_items" className="checkout_items">*/}
                  {/*      2*/}
                  {/*    </span>*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                </ul>
                <div className="hamburger_container">
                  <i className="fa fa-bars" aria-hidden="true" />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainNavigation;
