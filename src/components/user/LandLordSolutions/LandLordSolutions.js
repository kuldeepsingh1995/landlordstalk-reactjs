import React, {Component} from 'react';
import PropTypes from 'prop-types';
import img1 from "../../../assets/images/1.PNG"
import img2 from "../../../assets/images/2.PNG"
import img3 from "../../../assets/images/3.PNG"
import img4 from "../../../assets/images/4.PNG"
import img5 from "../../../assets/images/5.PNG"
import img6 from "../../../assets/images/property-svgrepo-com.png"
import img7 from "../../../assets/images/house-svgrepo-com.png"
import img8 from "../../../assets/images/rent-svgrepo-com.png"
import img9 from "../../../assets/images/house-property-svgrepo-com.png"
import img10 from "../../../assets/images/credit-card-svgrepo-com.png"
import img11 from "../../../assets/images/eviction.png"
import logoLight from "../../../assets/images/logo-light.png"
import './LandlordSolutions.css';
import SearchTenantReviews from '../SearchTenantReviews';
import ReadyToReview from '../ReadyToReview';
import { Helmet } from 'react-helmet';

class LandLordSolutions extends Component {
    state={
        darkBg:false
    }

    render() {
        return (
            <>
            <Helmet>
                <title>Landlord Solutions | Landlordstalk</title>
                <meta name="description" content="Landlord Solutions | Landlordstalk" />
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
                                        <p className="land-para">are you a landlord? <a href="#">Sign Up</a> to leave a review</p>
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
                                <h3 className="does-h">Complete <span>Landlord Solutions</span></h3>
                                <p>We know how difficult it can be to find a good tenant to occupy your space, so our top priority is to provide online landlord tools to give you complete solutions. Our screening process for tenants helps assure that your potential tenant will be a great fit.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="doesSection does-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <img className="sec-img" src={img7} />
                                <h3 className="does-h"><span>Online Tools</span> For Landlords</h3>
                                <p>We know how difficult it can be to find a good tenant to occupy your space, so our top priority is to provide online landlord tools to give you complete solutions. Our screening process for tenants helps assure that your potential tenant will be a great fit.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="main-header-banner search-tenants-banner">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-md-12">
                                <h3 className="does-h">What to look for <span>In a Good Tenant</span></h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="what-card what-light">
                                    <img src={img8}/>
                                    <h2>On-Time Rent</h2>
                                    <p>One of the biggest issues that landlords have is tenants who don’t pay their rent on time, or at all. With Landlord Talks, you can see if your potential tenant has a good or bad history of making payments.</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="what-card">
                                    <img src={img9}/>
                                    <h2>Respectful to the Property</h2>
                                    <p>Find someone who is going to respect your property. This includes cleaning, not causing damage, sticking with their agreements outlined in the lease, and being good neighbors. You can see all of this information and more on Landlord Talks.</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="what-card ">
                                    <img src={img10}/>
                                    <h2>Little to No Concerns on Credit or Background Check</h2>
                                    <p>If there are red flags on a background or credit check that you’re concerned about, don’t ignore them. Address everything upfront so you know exactly what you’re getting into if you accept the tenant.</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="what-card what-light">
                                    <img src={img11}/>
                                    <h2>No Past Evictions</h2>
                                    <p>Evictions are common when a tenant isn’t paying rent or respecting the terms in their contract. If a potential tenant has been evicted, make sure you find out why in order to avoid future potential problems. Reading Landlord Talks reviews on the tenant can help you get the information you need to make the best decision.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="doesSection">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="does-h">WHY?</h3>
                                <img className="sec-logo-img" src={logoLight} />
                                <p>Landlords Talk is here to help you get information about tenants that credit reports and background checks don’t tell you. We have the best tenant screening services for landlords, giving you the information you need to get the best tenant.</p>
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
}
LandLordSolutions.propTypes = {};

export default LandLordSolutions;
