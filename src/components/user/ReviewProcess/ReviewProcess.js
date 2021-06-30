import React, {Component} from 'react';
import PropTypes from 'prop-types';
import img1 from "../../../assets/images/1.PNG"
import img2 from "../../../assets/images/2.PNG"
import img3 from "../../../assets/images/3.PNG"
import img4 from "../../../assets/images/4.PNG"
import img5 from "../../../assets/images/5.PNG"
import './ReviewProcess.css';
import SearchTenantReviews from '../SearchTenantReviews';
import ReadyToReview from '../ReadyToReview';
import { Helmet } from 'react-helmet';

class ReviewProcess extends Component {
    state={
        darkBg:false
    }
    render() {
        return (
            <>
            <Helmet>
                <title>Review Process | Landlordstalk</title>
                <meta name="description" content="Review Process | Landlordstalk" />
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
                                <h3 className="does-h">What Landlords Talk <span>Does For You</span></h3>
                                <p>Finding a respectful and trustworthy person to rent your property shouldn’t be a hassle. There’s always a risk when it comes to renting out your space, so our goal is to make it easier for you to find a great tenant. You can have peace of mind after reading reviews from other landlords who have experienced working with the tenants firsthand.</p>
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
                                            <p>Fill a form to review your tentant</p>
                                        </div>
                                    </div>
                                    <div className="howItem">
                                        <img src={img3}/>
                                        <div className="howInfo">
                                            <h3>share</h3>
                                            <p>Share it with other landlords</p>
                                        </div>
                                    </div>
                                    <div className="howItem">
                                        <img src={img4}/>
                                        <div className="howInfo">
                                            <h3>search</h3>
                                            <p>Seacrh for a tentant review</p>
                                        </div>
                                    </div>
                                    <div className="howItem">
                                        <img src={img5}/>
                                        <div className="howInfo">
                                            <h3>find</h3>
                                            <p>Find reviews for you desire tentant</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="doesSection">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="does-h">What Landlords Talk <span>Tells You</span></h3>
                                <p className="count-p">Our detailed review form tells you exactly what you need to know about your potential tenant. Here’s what you’ll get:</p>
                                <p className="count-p">1. General information about the tenant</p>
                                <p className="count-p">2. The property address</p>
                                <p className="count-p">3. The tenant’s lease length</p>
                                <p className="count-p">4. If the tenant paid on time</p>
                                <p className="count-p">5. If the tenant damaged any property</p>
                                <p className="count-p">6. If the tenant left voluntarily once the lease expired or upon 30-day notice</p>
                                <p className="count-p">7. Any evictions that were issued</p>
                                <p className="count-p">8. Whether the tenant cleaned when they moved out</p>
                                <p className="count-p">9. Whether the tenant paid their outstanding balance when they moved out</p>
                                <p className="count-p"> Once the landlord fills out this information, they can add any other helpful information that landlords should know about potential tenants.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <ReadyToReview></ReadyToReview>
            </>
        );
    }
}
ReviewProcess.propTypes = {};

export default ReviewProcess;
