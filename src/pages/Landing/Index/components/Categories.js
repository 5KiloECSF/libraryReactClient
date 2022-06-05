import React from "react";
import {Link} from "react-router-dom";
import {LocalImg} from "../../../../Constants/constants";

const CategoriesItem  =({setFilter, category})=> {

    return (
        <div className="col-md-4" style={{marginTop :'2em'}}>
            <div
                className="banner_item align-items-center"
                style={{
                    backgroundImage: `url(${LocalImg(category.image)})`
                }}
            >
                <div className="banner_category">
                    < Link to={"/items"} onClick={()=>setFilter(category.id)} >{category.name}</Link>
                </div>
            </div>
        </div>
    );

}

function Categories ({categories, setFilter}) {
    return (
      <div className="banner">

        <div className="container">
            <h3>View by categories</h3>
          <div className="row">
              {
                  categories.map(category=>
                      <CategoriesItem
                          key={category.id}
                          category={category}
                          setFilter={setFilter}
                      />
                  )
              }

          </div>
        </div>
      </div>
    );

}


export default Categories


