import React, {useState} from "react";
import {Link} from "react-router-dom";


function List({name, onClick, isActive}) {
  return <li onClick={onClick}>
    {isActive?(< Link to="#">
              <span>
                <i className="fa fa-angle-double-right" aria-hidden="true"/>
              </span>
      {name}
    </Link>): <li>< Link to="#">{name}</Link></li>}

  </li>;
}

function SidebarList ({name, items, setFilter}) {
const [activeId, setActiveId]= useState("")
  const click=(id)=>{
  setActiveId(id)
    setFilter(id)
  }
  const hasItems= items!== undefined && items.length>0;
  // console.log(products)
  const nodes = hasItems ? (
      items.map(item =>
          <List
              key={item.id}
              isActive={item.id===activeId}
              name={item.name}
              onClick={()=>click(item.id)}
          />
      )
  ) : (
      ""
  )
    return (
      <div className="sidebar_section">
        <div className="sidebar_title">
          <h5>Movie {name}</h5>
        </div>
        <ul className="sidebar_categories">
          {nodes}

        </ul>
      </div>
    );
}

export default SidebarList;
