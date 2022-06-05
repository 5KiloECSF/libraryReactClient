import React from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {RootS} from "../../../../app/rootReducer";
import {logoutUser} from "../../../../features/auth/auth.reducer";


const TopNavigation= ()=> {

  const { authenticated} = useSelector(
      (state:RootS) => state.auth
  )

  const dispatch = useDispatch();

  return (
      <div className="top_nav">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="top_nav_left">
                {/*free shipping on all u.s orders over $50*/}
              </div>
            </div>
            <div className="col-md-6 text-right">
              <div className="top_nav_right">
                <ul className="top_nav_menu">
                  {}

                  {/*<li className="currency">*/}
                  {/*  < Link to="#">*/}
                  {/*    usd*/}
                  {/*    <i className="fa fa-angle-down" />*/}
                  {/*  </Link>*/}
                  {/*//   <ul className="currency_selection">*/}
                  {/*//     <li>*/}
                  {/*//       < Link to="#">cad</Link>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      < Link to="#">aud</Link>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      < Link to="#">eur</Link>*/}
                  {/*    </li>*/}
                  {/*    <li>*/}
                  {/*      < Link to="#">gbp</Link>*/}
                  {/*    </li>*/}
                  {/*  </ul>*/}
                  {/*</li>*/}

                  <li className="language">
                    < Link to="#">
                      English
                      <i className="fa fa-angle-down" />
                    </Link>
                    <ul className="language_selection">
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

                  <li className="account">
                    < Link to="#">
                      My Account
                      <i className="fa fa-angle-down" />
                    </Link>
                    <ul className="account_selection">
                      {!authenticated&&<li>
                        < Link to="/login">
                          <i className="fa fa-sign-in" aria-hidden="true"/>
                          Sign In
                        </Link>
                      </li>}
                      {authenticated&&<li>
                        < Link to="/" onClick={()=>dispatch(logoutUser())}>
                          <i className="fa fa-sign-out" aria-hidden="true"/>
                          logout
                        </Link>
                      </li>}
                      {!authenticated&&<li>
                        < Link to="/signup">
                          <i className="fa fa-user-plus" aria-hidden="true"/>
                          Register
                        </Link>
                      </li>}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

}

export default TopNavigation;
