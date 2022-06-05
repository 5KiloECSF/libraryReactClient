import React from "react";
import SidebarList from "./SideBar/SidebarList";
import SidebarPrice from "./SideBar/SidebarPrice";
// import SidebarCheckbox from "./SideBar/SidebarCheckbox";
import SidebarColor from "./SideBar/SidebarColor";

function Sidebar ({genres, categories, setGenre, setCategory, types, setTypes}) {
    return (
      <div className="sidebar">

        <SidebarList name={"Types"} items={types} setFilter={(id)=>setTypes(id)}/>
        <SidebarList name={"Categories"} items={categories} setFilter={(id)=>setCategory(id)}/>
        <SidebarList name={"Genres"} items={genres} setFilter={(id)=>setGenre(id)}/>

        <SidebarPrice/>
        {}
        {/*<SidebarCheckbox/>*/}
        {}
        {/*<SidebarColor/>*/}
      </div>
    );

}

export default Sidebar;
