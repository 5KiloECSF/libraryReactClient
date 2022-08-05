import React from "react";
import {Link} from "react-router-dom";
import { NetworkImage} from "Constants/constants";


function NewArrivalsRow ({items, selectItem}) {
    const hasProducts= items.length>0;
    // console.log(products)
    const nodes = hasProducts ? (
        items.map(item =>
            <NewArrivalsItem
                key={item.id}
                item={item}


                selectItem={()=>selectItem(item)}
            />

        )
    ) : (
        <div><Link to="/" ><em>no  Items in this page. Go back To main Page</em></Link></div>
    )
    return (
      <div className="row">
        <div className="col">
          <div className="item-grid custom1-flex-container">
            {
                nodes
            }



          </div>
        </div>
      </div>
    );

}

export default NewArrivalsRow;

const NewArrivalsItem =({item, selectItem})=> {
  return (
      <div className="item-item men custom1-flex-item" style={{width:'20%'}}>
        <div className="item discount product_filter">
            < Link onClick={()=>selectItem()} to={"/single"}>
                <div className="product_image">
                    <img src={NetworkImage(item.path, item.image)} alt="" />

                </div>
            </Link>

          <div className="favorite favorite_left" />
          <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
            {/*<span>-$20</span>*/}
          </div>
          <div className="product_info">
            <h6 className="product_name">
              < Link onClick={()=>selectItem()} to={"/single"}>
                  {item.title}
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
  );
}

