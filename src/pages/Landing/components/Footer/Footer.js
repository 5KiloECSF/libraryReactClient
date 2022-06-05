import React from "react";
import {Link} from "react-router-dom";
import CopyRight from "./CopyRight";
class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="footer_nav_container d-flex flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center text-center">
                <ul className="footer_nav">
                  <li>
                    < Link to="#">Blog</Link>
                  </li>
                  <li>
                    < Link to="#">FAQs</Link>
                  </li>
                  <li>
                    < Link to="contact.html">Contact us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="footer_social d-flex flex-row align-items-center justify-content-lg-end justify-content-center">
                <ul>
                  <li>
                    < Link to="#">
                      <i className="fa fa-facebook" aria-hidden="true" />
                    </Link>
                  </li>
                  <li>
                    < Link to="#">
                      <i className="fa fa-twitter" aria-hidden="true" />
                    </Link>
                  </li>
                  <li>
                    < Link to="#">
                      <i className="fa fa-instagram" aria-hidden="true" />
                    </Link>
                  </li>
                  <li>
                    < Link to="#">
                      <i className="fa fa-skype" aria-hidden="true" />
                    </Link>
                  </li>
                  <li>
                    < Link to="#">
                      <i className="fa fa-pinterest" aria-hidden="true" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/*<CopyRight></CopyRight>*/}
        </div>
      </footer>
    );
  }
}

export default Footer;
