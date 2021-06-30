import React, { useCallback, useEffect, Component, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import img1 from "../../../assets/images/1.PNG";
import img2 from "../../../assets/images/2.PNG";
import img3 from "../../../assets/images/3.PNG";
import img4 from "../../../assets/images/4.PNG";
import img5 from "../../../assets/images/5.PNG";
import user from "../../../assets/images/avatar.png";
import "./HomeStyle.css";
import SearchTenantReviews from '../SearchTenantReviews';
import ReadyToReview from '../ReadyToReview';
import Loader from "../../Loader";
import { Helmet } from "react-helmet";
const Home = (props) => {
  let search;
  return (
    <>
    <Helmet>
        <title>Home | Landlordstalk</title>
        <meta name="description" content="Home | Landlordstalk" />
    </Helmet>
     <SearchTenantReviews withTopTabs={true}></SearchTenantReviews>
      <section className="howItWorks">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3 className="section-h3">
                How It <span>Works</span>
              </h3>
              <div className="how">
                <div className="howItem">
                  <img src={img1} />
                  <div className="howInfo">
                    <h3>sign up</h3>
                    <p>Create your account</p>
                  </div>
                </div>
                <div className="howItem">
                  <img src={img2} />
                  <div className="howInfo">
                    <h3>Review</h3>
                    <p>Fill a form to review<br/>your tentant</p>
                  </div>
                </div>
                <div className="howItem">
                  <img src={img3} />
                  <div className="howInfo">
                    <h3>share</h3>
                    <p>Share it with other<br/>landlords</p>
                  </div>
                </div>
                <div className="howItem">
                  <img src={img4} />
                  <div className="howInfo">
                    <h3>search</h3>
                    <p>Search for a tentant<br/>review</p>
                  </div>
                </div>
                <div className="howItem">
                  <img src={img5} />
                  <div className="howInfo">
                    <h3>find</h3>
                    <p>Find reviews for your<br/>desire tentant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ReadyToReview></ReadyToReview>
    </>
  );
};
Home.propTypes = {};
export default Home;
