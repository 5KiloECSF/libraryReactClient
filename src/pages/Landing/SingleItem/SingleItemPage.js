import React from "react";

import Tabs from "./components/Tabs";
import Breadcrumbs from "./components/Breadcrumbs";

// css
import './assets/css/single_responsive.css'
import './assets/css/single_styles.css'
import ProductImages from "./ProductBody/ProductImages";
import ProductDetails from "./ProductBody/ProductDetails";


const SingleItemPage= ({item})=> {
    return (
      <>
        <div className="container single_product_container">
          <div className="row">
            <div className="col">
              {/*<Breadcrumbs/>*/}
            </div>
          </div>
            <div className="row">
                <ProductImages item={item}/>
                <ProductDetails item={item}
                                addToFavorite={()=>console.log("fav clicked")}
                />
            </div>

        </div>

        {/*<Tabs/>*/}

      </>
    );

}



export default SingleItemPage
