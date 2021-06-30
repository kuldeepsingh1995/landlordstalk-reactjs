import React, { useCallback, useEffect, Component, useState } from "react";
import {useSelector} from 'react-redux';
import { Link, NavLink, useHistory, withRouter } from "react-router-dom";
 import "./new.css";

const ReadyToReview = (props) => {
  const history = useHistory();
  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.authentication.user?.loggedIn,
    };
  });
 
  return (
    <>
    
      <section className="callout-section">
      <div className="call-over"></div>
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-md-6 col-sm-12"></div>
          <div className="col-xl-5 col-lg-6 col-md-12 col-sm-12">
            <div className="cSUBMIT REVIEWall-warp">
              <h3> Ready to review your tenant?</h3>
              <p>
                Having a screening process for tenants helps you find out what you need to know before you approve someone to rent your property, and Landlord Talks has the best tenant screening services for landlords.
                </p>
                
                    {isLoggedIn ?
                        <button onClick={() => {

                          window.scrollTo(0,0)
                          history.push('/user?open=1')
                      }} className={["mainBtn",isLoggedIn?"reviewBtn":""].join(" ")}>
                        <a
                            
                            style={{color: "inherit !important"}}> LEAVE A REVIEW</a>
                            </button>
                        : 
                        <button onClick={() => {
                          history.push('/user/signup')
                          window.scrollTo(0,0)

                      }}  className={["mainBtn",isLoggedIn?"reviewBtn":""].join(" ")}>
                        <a  style={{color: "inherit !important"}}> REGISTER NOW</a>
                        </button>
                        }
                

            </div>
          </div>
        </div>
      </div>
    </section>
     
    </>
  )
}

ReadyToReview.propTypes = {};

export default ReadyToReview;
