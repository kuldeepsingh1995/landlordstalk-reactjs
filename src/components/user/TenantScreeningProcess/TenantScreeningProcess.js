import React, {Component} from 'react';
import PropTypes from 'prop-types';
import img1 from "../../../assets/images/1.PNG"
import img2 from "../../../assets/images/2.PNG"
import img3 from "../../../assets/images/3.PNG"
import img4 from "../../../assets/images/4.PNG"
import img5 from "../../../assets/images/5.PNG"
import img6 from "../../../assets/images/XMLID_354_.png"
import img7 from "../../../assets/images/customer-review (1).png"
import img8 from "../../../assets/images/background-check.png"
import img9 from "../../../assets/images/credit-card.png"
import img10 from "../../../assets/images/customer-review.png"
import img11 from "../../../assets/images/Group 490.png"
import logoLight from "../../../assets/images/letter.png"
import './TenantScreeningProcess.css';
import SearchTenantReviews from '../SearchTenantReviews';
import ReadyToReview from '../ReadyToReview';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';


const TenantScreeningProcess = () =>  {
    const history = useHistory();
    const { isLoggedIn, user_obj } = useSelector((state) => {
        return {
          isLoggedIn: state.authentication.user?.loggedIn,
          user_obj: state.authentication.user?.user_obj,
        };
      });
    
         return (
            <>
            <Helmet>
                <title>Tenant Screening Process | Landlordstalk</title>
                <meta name="description" content="Tenant Screening Process | Landlordstalk" />
            </Helmet>
            <SearchTenantReviews withTopTabs={false}></SearchTenantReviews>
            
                {/* <section className="main-header-banner search-tenants-banner">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-7 col-md-10">
                                <div className="tab-content">
                                    <div className="tab-pane container active" id="search">
                                        <h1 className="main-h1">SEARCH TENANT REVIEWS</h1>
                                        <p className="main-p">Find everything you need to know about your potential tenant</p>
                                        <div className="input-group mt-4 mb-3 search-header-bar">
                                            <input type="text" className="form-control"
                                                   placeholder="Enter Tenant Information To Find Reviews"/>
                                            <div className="input-group-append">
                                                <span className="input-group-text"><i className='bx bx-search-alt-2'></i></span>
                                            </div>
                                        </div>
                                        <p className="land-para">are you a landlord? <a href="#">Sign Up</a> to leave a review
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}

                <section className="doesSection">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <img className="sec-img" src={img6} />
                                <h3 className="does-h">Tenant <span>Screening Process</span></h3>
                                <p>We know how difficult it can be to find a good tenant to occupy your space, so our top priority is to provide online landlord tools to give you complete solutions. Our screening process for tenants helps assure that your potential tenant will be a great fit.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="main-header-banner search-tenants-banner light-bg">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-md-12">
                                <h3 className="does-h">Guide To <span>Screening a Tenant</span></h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="what-card what-light-2">
                                    <img src={img8}/>
                                    <h2>1. Order a background check</h2>
                                    <p>The first thing you’ll want to do is order a background check. This can tell you whether the applicant has a criminal history, it checks employment history, and past evictions. It also shows the basic information you need to know about a potential tenant.</p>
                                  </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="what-card">
                                    <img src={img9}/>
                                    <h2>2. Do a credit check</h2>
                                    <p>A credit check will give you an idea of how trustworthy your tenant will be when it comes to paying rent on time. However, it’s important to remember that someone can have decent credit but pay a few days late every month – credit reports won’t show everything.</p>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className="what-card">
                                    <img src={img10}/>
                                    <h2>3. Read reviews</h2>
                                    <p>This is where Landlord Talks comes in. Reviews on our site can tell you things background and credit checks won’t, so reading reviews from other landlords will help you make the decision to accept or reject an application.</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="what-card what-light-2">
                                    <img src={img11}/>
                                    <h2>4. Pay it forward</h2>
                                    <p>Leaving reviews on your tenants will help other landlords determine whether they’ll accept or reject an application. When you leave a review, positive or negative, you’re helping others have the best experience possible too.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="doesSection does-light-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <img className="sec-img" src={img7} />
                                <h3 className="does-h">Leaving <span>Reviews</span></h3>
                                <p>The process is simple. Create an account on Landlord Talks, then fill out a form to review a tenant. Landlords can then search for tenants and use your review to determine whether they’ll accept the tenant’s rental application. Be as specific and as detailed as possible so the landlords reading it will get a clear idea of whether the tenant will be a good fit.</p>
                                
                                {isLoggedIn ?
                                    <a onClick={() =>  {
                                        history.push('/user?open=1')
                                        window.scrollTo(0,0)
        
                                    }} > <button className='dark-btn'>REVIEW NOW</button></a>
                                    : <a  onClick={() => {
                                        history.push('/user/signup')
                                        window.scrollTo(0,0)
                                    }}
                                   > <button className='dark-btn'>REGISTER NOW</button></a>}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="doesSection">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <img className="sec-img" src={logoLight} />
                                <h3 className="does-h">Writing <span>Reviews</span></h3>
                                <p>When you’re screening a tenant, simply search the Landlord Talks database to find the information you need. Hearing directly from landlords who have worked with the tenants you’re screening will help you make the best, most informed decision possible.</p>
                                
                                {isLoggedIn ?
                                    <a  onClick={() =>  {
                                        history.push('/user?open=1')
                                        window.scrollTo(0,0)
        
                                    }}  > <button className='green-btn'>REVIEW NOW</button></a>
                                    : <a onClick={() => {
                                        history.push('/user/signup')
                                        window.scrollTo(0,0)
                                    }}> <button className='green-btn'>REGISTER NOW</button></a>}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="howItWorks">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="section-h3">How It <span>Works</span></h3>
                                <div className="how">
                                    <div className="howItem">
                                        <img src={img1}/>
                                        <div className="howInfo">
                                            <h3>sign up</h3>
                                            <p>Create your account</p>
                                        </div>
                                    </div>
                                    <div className="howItem">
                                        <img src={img2}/>
                                        <div className="howInfo">
                                            <h3>Review</h3>
                                            <p>Fill a form to review your<br/>tentant</p>
                                        </div>
                                    </div>
                                    <div className="howItem">
                                        <img src={img3}/>
                                        <div className="howInfo">
                                            <h3>share</h3>
                                            <p>Share it with other<br/>landlords</p>
                                        </div>
                                    </div>
                                    <div className="howItem">
                                        <img src={img4}/>
                                        <div className="howInfo">
                                            <h3>search</h3>
                                            <p>Search for a tentant<br/>review</p>
                                        </div>
                                    </div>
                                    <div className="howItem">
                                        <img src={img5}/>
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
    }
 
TenantScreeningProcess.propTypes = {};

export default TenantScreeningProcess;
