import React from "react";
import { Link } from "react-router-dom";

export default function PostTrending({ trends, latest }) {
  const trendings = trends.map(function (trend) {
    return (
      <div className="col-lg-3 col-sm-6" key={trend.id}>
        <div className="single-post-wrap">
          <div className="thumb">
            <img src={trend.image} alt="img" style={{height: "245px", width: "100%"}}/>
            <a className="tag-base tag-light-green">{trend.category_id}</a>
          </div>
          <div className="details">
            <div className="post-meta-single mb-3">
              <ul>
                <li>
                  <i className="fa fa-clock-o" />
                  {(new Date(trend.created_at)).getDay()}.{(new Date(trend.created_at)).getMonth()}.{(new Date(trend.created_at)).getFullYear()}
                </li>
              </ul>
            </div>
            <h6>
              <Link to={`/blog/${trend.id}`}>
                <a href="#">{trend.title}</a>
              </Link>
            </h6>
            <p>{trend.article}</p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="tranding-area pd-top-75 pd-bottom-50">
      <div className="container">
        <div className="section-title">
          <div className="row">
            <div className="col-md-3 mb-2 mb-md-0">
              <h6 className="title">Trending Blogs</h6>
            </div>
          </div>
        </div>
        <div className="tab-content" id="enx1-content">
          <div
            className="tab-pane fade show active"
            id="enx1-tabs-1"
            role="tabpanel"
          >
            <div className="row">
              {trendings}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
