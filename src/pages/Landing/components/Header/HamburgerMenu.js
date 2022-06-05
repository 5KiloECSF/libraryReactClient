import React from "react";
import {Link} from "react-router-dom";
class HamburgerMenu extends React.Component {
  render() {
    return (
      <div className="hamburger_menu">
        <div className="hamburger_close">
          <i className="fa fa-times" aria-hidden="true" />
        </div>
        <div className="hamburger_menu_content text-right">
          <ul className="menu_top_nav">
            <li className="menu_item has-children">
              < Link to="#">
                usd
                <i className="fa fa-angle-down" />
              </Link>
              <ul className="menu_selection">
                <li>
                  < Link to="#">cad</Link>
                </li>
                <li>
                  < Link to="#">aud</Link>
                </li>
                <li>
                  < Link to="#">eur</Link>
                </li>
                <li>
                  < Link to="#">gbp</Link>
                </li>
              </ul>
            </li>
            <li className="menu_item has-children">
              < Link to="#">
                English
                <i className="fa fa-angle-down" />
              </Link>
              <ul className="menu_selection">
                <li>
                  < Link to="#">French</Link>
                </li>
                <li>
                  < Link to="#">Italian</Link>
                </li>
                <li>
                  < Link to="#">German</Link>
                </li>
                <li>
                  < Link to="#">Spanish</Link>
                </li>
              </ul>
            </li>
            <li className="menu_item has-children">
              < Link to="#">
                My Account
                <i className="fa fa-angle-down" />
              </Link>
              <ul className="menu_selection">
                <li>
                  < Link to="#">
                    <i className="fa fa-sign-in" aria-hidden="true" />
                    Sign In
                  </Link>
                </li>
                <li>
                  < Link to="#">
                    <i className="fa fa-user-plus" aria-hidden="true" />
                    Register
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu_item">
              < Link to="#">home</Link>
            </li>
            <li className="menu_item">
              < Link to="#">shop</Link>
            </li>
            <li className="menu_item">
              < Link to="#">promotion</Link>
            </li>
            <li className="menu_item">
              < Link to="#">pages</Link>
            </li>
            <li className="menu_item">
              < Link to="#">blog</Link>
            </li>
            <li className="menu_item">
              < Link to="#">contact</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default HamburgerMenu;
