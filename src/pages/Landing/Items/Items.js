import React from "react";

//== ----components
// import Breadcrumbs from "./Items/components/Breadcrumbs";
// import Sidebar from "./container/sidebar.container";
import MainContent from "./MainContent";

//Css
import '../assets/css/categories_responsive.css'
import './assets/css/categories_styles.css'
import {Col} from "antd";


const Items =()=> {

    return (



      <div className="container product_section_container">
        <div className="row">
          <div className="col product_section clearfix">
            {/*<Breadcrumbs/>*/}
            {}
            {/*<Sidebar/>*/}
            {}
            <MainContent

            />
          </div>
        </div>
      </div>

    );
  }


export default Items;
