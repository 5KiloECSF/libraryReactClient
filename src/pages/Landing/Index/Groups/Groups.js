import React from "react";
import {Link} from "react-router-dom";
import { NetworkImage} from "Constants/constants";

import LoadMore from "./loadMore";

function Groups ({groups, filter}) {
    return (
      <div className="blogs">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <div className="section_title">
                <h2>Movie Groups</h2>
              </div>
            </div>
          </div>
          <div className="row blogs_container">
              {
                  groups.map(group=><BlogsItem
                      key={group.id}
                      group={group}
                      // setFilter={setFilter}
                  />)
              }
            {/*  <BlogsItem/>*/}
            {/*<BlogsItem/>*/}
            {/*<BlogsItem/>*/}
            {/*<BlogsItem/>*/}
            {/*<BlogsItem/>*/}
            {/*<BlogsItem/>*/}
          </div>

        </div>

          <LoadMore filter={filter} />
      </div>
    );

}

export default Groups;


const BlogsItem =({group})=>{
  return (
      <div className="col-lg-4 blog_item_col">
        <div className="blog_item">
          <div

              className="blog_background"
              style={{
                backgroundImage: `url(${NetworkImage(group.path, group.image)})`
              }}
          />
          <div className="blog_content d-flex flex-column align-items-center justify-content-center text-center">
            <h4 className="blog_title">
                {group.name}
            </h4>
            <span className="blog_meta">by admin | dec 01, 2017</span>
            <Link to={"#"} className="blog_more" href="#">
              View all series movies
            </Link>
          </div>
        </div>
      </div>
  );

}