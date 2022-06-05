import React from "react";
import {Link} from "react-router-dom";
import {Col} from 'antd'

function Item ({item, selectItem}) {
    return (
        <Col xs={12} xl={4} lg={6}>
      <div className="item-item men" style={{width:'100%'}}>
        <div className="item discount product_filter">
          <div className="product_image" style={{width:'90%'}}>
              < Link onClick={selectItem} to={`/single/${item.id}`}>
                  <img src={item.poster} alt="" />
              </Link>

          </div>
          <div className="favorite favorite_left" />
          <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
            <span>Taken</span>
          </div>
          <div className="product_info">
            <h6 className="product_name">
              < Link onClick={selectItem} to={`/single/${item.id}`}>
                  {item.name}
              </Link>
            </h6>
            <div className="product_price">
                 {item.year}<span>

            </span>
            </div>
          </div>
        </div>
        <div className="red_button add_to_cart_button">
          < Link to="#">add to cart</Link>
        </div>
      </div>
        </Col>
    );
  }


export default Item;
