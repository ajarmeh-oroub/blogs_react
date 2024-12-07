import React from "react";
import { Link } from "react-router-dom";

export default function BannerArea({data, loading, error}) {

  // first blog
  const bannerBlogs = data.map(function (blog) {
    return (
      <div className="row" key={blog.id}>
        <div className="col-lg-6">
          <div className="thumb after-left-top">
            <img
              src={blog.image}
              alt="img"
              style={{ height: "400px", width: "900px" }}
            />
          </div>
        </div>
        <div className="col-lg-6 align-self-center">
          <div className="banner-details mt-4 mt-lg-0">
            <div className="post-meta-single">
              <ul>
                <li>
                  <a className="tag-base tag-blue" href="#">
                    {blog.category_id}
                  </a>
                </li>
                <li className="date">
                  <i className="fa fa-clock-o" />
                  {blog.created_at}
                </li>
              </ul>
            </div>
            <h2>{blog.title}</h2>
            <p>{blog.article}. </p>
            <Link to={`/blog/${blog.id}`} className="btn btn-blue">Read More</Link>
          </div>
        </div>
      </div>
    );
  });

  // 
  const sub = data.slice(1,5);
  const subBannerBlogs = sub.map(function (blog) {
    return (
      <div className="col-lg-3 col-sm-6" key={blog.id}>
      <div className="single-post-wrap style-white">
        <div className="thumb">
          <img src={blog.image} alt="img" style={{height:"200px", width: "450px"}}/>
          <a className="tag-base tag-blue" href="#">{blog.category_id}</a>
        </div>
        <div className="details">
          <h6 className="title">
            <Link to={`/blog/${blog.id}`}>
              <a href="#">{blog.title}</a>
            </Link>
          </h6>
          <div className="post-meta-single mt-3">
            <ul>
              <li>
                <i className="fa fa-clock-o" />
                {blog.created_at}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    );
  });




  return (
    <>

      {/* banner area start */}
      <div className="banner-area banner-inner-1 bg-black" id="banner">
        {/* banner area start */}
        <div className="banner-inner pt-5">
          <div className="container">{bannerBlogs[0]}</div>
        </div>
        {/* banner area end */}
        <div className="container">
          <div className="row">
            {subBannerBlogs}
          </div>
        </div>
      </div>
      {/* banner area end */}
    </>
  );
}
