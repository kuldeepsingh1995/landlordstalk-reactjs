import React, {Component} from 'react';
import PropTypes from 'prop-types';
import img1 from "../../../assets/images/1.PNG"
import img2 from "../../../assets/images/2.PNG"
import img3 from "../../../assets/images/3.PNG"
import img4 from "../../../assets/images/4.PNG"
import img5 from "../../../assets/images/5.PNG"
import google from "../../../assets/images/google-icon.png"
import facebook from "../../../assets/images/Facebook Logo.png"
import './searchTenants.css';
class SearchTenants extends Component {
    state={
        darkBg:false
    }
    render() {
        return (
            <>
                <section className={["main-header-banner",this.state.darkBg?"":"search-tenants-banner"].join(" ")}>
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-7 col-md-10">
                                <ul className="nav nav-pills tenant-tabs">
                                    <li className="nav-item" onClick={()=>{this.setState({darkBg:false})}}>
                                        <a className="nav-link active" data-toggle="pill" href="#search">SEARCH FOR TENANTS</a>
                                    </li>
                                    <li className="nav-item" onClick={()=>{this.setState({darkBg:true})}}>
                                        <a className="nav-link" data-toggle="pill" href="#review">LEAVE A REVIEW</a>
                                    </li>
                                </ul>
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
                                    <div className="tab-pane container fade" id="review">
                                        <form className="loginForm">
                                            <p className="main-form-heading">Tenant Details</p>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Tenant's Last Name</label>
                                                        <input type="text" className="form-control" placeholder="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Tenant's First Name</label>
                                                        <input type="text" className="form-control" placeholder="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Tenant's Date of Birth</label>
                                                        <input type="date" className="form-control" placeholder="" />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="main-form-heading">Property Details</p>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Property Street Address</label>
                                                            <input type="text" className="form-control" placeholder="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Property City</label>
                                                        <input type="text" className="form-control" placeholder="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Property State</label>
                                                        <input type="text" className="form-control" placeholder="" />
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="main-form-heading">Length of Lease</p>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Lease Start Date</label>
                                                        <input type="date" className="form-control" placeholder="" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Lease End Date</label>
                                                        <input type="date" className="form-control" placeholder="" />
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="main-form-heading">Tenant Ratings</p>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label className="main-label">1. Did the tenant pay on time?</label>
                                                        <label className="option-label">
                                                            <input type="checkbox" className="form-control" placeholder="" />
                                                            Yes
                                                        </label>
                                                        <label className="option-label">
                                                            <input type="checkbox" className="form-control" placeholder="" />
                                                            No
                                                        </label>
                                                        <div className="rating-div">
                                                            <p>Rating:</p>
                                                            <div className="stars">
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="main-label">2. Did the tenant damage the property?</label>
                                                        <label className="option-label">
                                                            <input type="checkbox" className="form-control" placeholder="" />
                                                            Yes
                                                        </label>
                                                        <label className="option-label">
                                                            <input type="checkbox" className="form-control" placeholder="" />
                                                            No
                                                        </label>
                                                        <div className="rating-div">
                                                            <p>Rating:</p>
                                                            <div className="stars">
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="main-label">3. Did the tenant voluntarily leave upon lease expiration on 30-day notice?</label>
                                                        <label className="option-label">
                                                            <input type="checkbox" className="form-control" placeholder="" />
                                                            Yes
                                                        </label>
                                                        <label className="option-label">
                                                            <input type="checkbox" className="form-control" placeholder="" />
                                                            No
                                                        </label>
                                                        <div className="rating-div">
                                                            <p>Rating:</p>
                                                            <div className="stars">
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="main-label">4. Did you have to file an eviction in court to remove this tenant?</label>
                                                        <label className="option-label">
                                                            <input type="checkbox" className="form-control" placeholder="" />
                                                            Yes
                                                        </label>
                                                        <label className="option-label">
                                                            <input type="checkbox" className="form-control" placeholder="" />
                                                            No
                                                        </label>
                                                        <div className="rating-div">
                                                            <p>Rating:</p>
                                                            <div className="stars">
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="main-label">5. Did the tenant leave the property clean when they moved out?</label>
                                                        <label className="option-label">
                                                            <input type="checkbox" className="form-control" placeholder="" />
                                                            Yes
                                                        </label>
                                                        <label className="option-label">
                                                            <input type="checkbox" className="form-control" placeholder="" />
                                                            No
                                                        </label>
                                                        <div className="rating-div">
                                                            <p>Rating:</p>
                                                            <div className="stars">
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="main-label">6. Did the tenant pay all outstanding balance when they moved out?</label>
                                                        <label className="option-label">
                                                            <input type="checkbox" className="form-control" placeholder="" />
                                                            Yes
                                                        </label>
                                                        <label className="option-label">
                                                            <input type="checkbox" className="form-control" placeholder="" />
                                                            No
                                                        </label>
                                                        <div className="rating-div">
                                                            <p>Rating:</p>
                                                            <div className="stars">
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                                <i className='bx bxs-star empty'></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="main-form-heading">Additional Information</p>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Any other comments that other landlords should know about this tenant? ( 255 words limit)</label>
                                                        <textarea className="form-control" rows="6"></textarea>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row s-row">
                                                <div className="col-md-12">
                                                    <button type="submit" className="btn loginFormBtn tab-btn">SUBMIT REVIEW</button>
                                                    <button type="reset" className="btn btn-primary clear-form-btn tab-btn">CLEAR FORM</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
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
                <section className="callout-section">
                    <div className="call-over"></div>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xl-7 col-md-6 col-sm-12">

                            </div>
                            <div className="col-xl-5 col-md-6 col-sm-12">
                                <div className="call-warp">
                                    <h3>Ready to review your tenant?</h3>
                                    <p>Having a screening process for tenants helps you find out what you need to know before you approve someone to rent your property, and Landlord Talks has the best tenant screening services for landlords.
                                    </p>
                                    <button className="mainBtn">Register Now</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

            </>
        );
    }
}

SearchTenants.propTypes = {};

export default SearchTenants;
