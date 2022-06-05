import React from "react";
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";
// import Item from "../../Items/components/Item";

AddToCart.propTypes = {onClick: PropTypes.func};
const ProductDetails  = ({ item, addToFavorite}) => {

    return (
      <div className="col-lg-5">
        <div className="product_details">
          <div className="product_details_title">
            <h2>{item.name}</h2>
            <p>
              Nam tempus turpis at metus scelerisque placerat nulla deumantos
              solicitud felis. Pellentesque diam dolor, elementum etos lobortis
              des mollis ut...
            </p>
          </div>
          <div className="free_delivery d-flex flex-row align-items-center justify-content-center">
            <span className="ti-truck"/>
            <span>{item.genre}</span>
          </div>
          {/*<div className="original_price">$629.99</div>*/}
          {/*<div className="product_price">$495.00</div>*/}

            {/*<Rating/>*/}
          <Color genres={item.genres}/>

          {/*<AddToCart onClick={() => addToFavorite(item)}/>*/}

        </div>
      </div>
    );
  }


export default ProductDetails;

function Rating() {
  return <ul className="star_rating">
    <li>
      <i className="fa fa-star" aria-hidden="true"/>
    </li>
    <li>
      <i className="fa fa-star" aria-hidden="true"/>
    </li>
    <li>
      <i className="fa fa-star" aria-hidden="true"/>
    </li>
    <li>
      <i className="fa fa-star" aria-hidden="true"/>
    </li>
    <li>
      <i className="fa fa-star-o" aria-hidden="true"/>
    </li>
  </ul>;
}

function Color({genres}) {
    const hasProducts =genres?.length>0
    const nodes = hasProducts ? (
        genres.map(item =>
            <div>
                <span>

                    <div>{item}</div>

                </span>

            </div>

        )
    ) : (
       ""
    )
  return <div className="product_color">
    <div>genres:</div>
    <ul>
        {nodes}
    </ul>
  </div>;
}

function AddToCart(props) {
  return <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
    <span>Quantity:</span>
    <div className="quantity_selector">
              <span className="minus">
                <i className="fa fa-minus" aria-hidden="true"/>
              </span>
      <span id="quantity_value">1</span>
      <span className="plus">
                <i className="fa fa-plus" aria-hidden="true"/>
              </span>
    </div>
    <div className="red_button add_to_cart_button">
      <Link onClick={props.onClick} href="#">add to cart</Link>
    </div>
    <div className="product_favorite d-flex flex-column align-items-center justify-content-center"/>
  </div>;
}
