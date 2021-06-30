import React, { useCallback, useEffect, Component, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CircularProgressWithLabel from "../../UIElements/CircularBar/CircularBar";
import { BASE_PATH_USERS } from '../../helpers/UploadDirectory';
import { Link } from "react-router-dom";
const TenantSearch = (props) => {
  const ratingsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [isDisplay, setIsDisplay] = useState({});
  return (
    <>
     {
       (props.searchStatus==2) && (
<section className="search-result daman">
        <div className="container">
          {
            (props.searchText!='' && props.searchStatus==2) && (
              <div className="row">
                <div className="col-md-12">
                  <div className="breadcrumb">
                    <div className="breadcrumb-item">
                      <p>
                        <i className="bx bxs-home"></i> SEARCH
                      </p>
                    </div>
                    <div className="breadcrumb-item active">
                      <p>{props.searchText}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          
         
          
               
               <div className={props.isLoggedIn ? '' : 'mainWrapReview'}>
                
                {props.searchStatus==1 ? <p>Loading...</p> : ''}
                {
                  (props.Reviews.length <= 0 && props.searchStatus==2) ? 
                  (
                    props.isLoggedIn 
                    ? <p className={"no-result"}>No result found..</p>
                    : 
                    <div className="search-card">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="row progress-row">
                            <div className="col-sm-4">
                              <div className="bar-div">
                                <CircularProgressWithLabel
                                  style={{ color: 'green' }}
                                  size="70px"
                                  font={20}
                                  thickness={4}
                                  text={10}
                                  value={100}
                                />
                                <p>Overall Rating</p>
                              </div>
                            </div>
                            <div className="col-sm-8">
                              <div className="row">
                                <div className="col-6">
                                  <div className="bar-div">
                                    <CircularProgressWithLabel
                                      style={{ color: 'green' }}
                                      size="40px"
                                      thickness={5}
                                      text={Number(10)}
                                      value={Number(100)}
                                    />
                                    <p>Rent Payments</p>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="bar-div">
                                    <CircularProgressWithLabel
                                      style={{ color: 'green' }}
                                      size="40px"
                                      thickness={5}
                                      text={Number(10)}
                                      value={Number(100)}
                                    />
                                    <p>Lease Expiration</p>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  <div className="bar-div">
                                    <CircularProgressWithLabel
                                      style={{ color: 'green' }}
                                      size="40px"
                                      thickness={5}
                                      text={Number(10)}
                                      value={Number(100)}
                                    />
                                    <p>Property Damage</p>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="bar-div">
                                    <CircularProgressWithLabel
                                      style={{ color: 'green' }}
                                      size="40px"
                                      thickness={5}
                                      text={Number(10)}
                                      value={Number(100)}
                                    />
                                    <p>After Moving Out</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="detail-info">
                            <div className="detail-item">
                              <p className="heading">Tenant Name</p>
                              <p>John</p>
                            </div>
                            <div className="detail-item">
                              <p className="heading">Date of Birth</p>
                              <p>{'28-01-1990'}</p>
                            </div>
                            <div className="detail-item">
                              <p className="heading">Property Address</p>
                              <p>Street 2, South 1, Melbourne</p>
                            </div>
                            <div className="detail-item">
                              <p className="heading">Length of Lease</p>
                              <p>8 Years</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <p className="time-p">
                            <i className="bx bx-time-five"></i> 1 day ago
                              </p>
                        </div>
                        <div className="col-6">
                          <button  className="mainBtn">MORE DETAILS</button>
                        </div>
                      </div>
                    </div>
                  )
                  
                  : ''
                }
                {props.Reviews.map((review) => {
                  let fullView = (
                    <div className="search-card search-expaned">
                      <div className="row">
                        <div className="col-md-4 col-lg-4">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="row progress-row">
                                <div className="col-sm-12">
                                  <div className="bar-div">
                                    <CircularProgressWithLabel
                                      style={{ color: review.OVERALL_RATING.OVERALL_RATING_COLOR }}
                                      size="70px"
                                      font={20}
                                      thickness={4}
                                      text={Number(review.OVERALL_RATING.OVERALL_RATING)}
                                      value={Number(review.OVERALL_RATING.OVERALL_RATING_PERCENTAGE)}
                                    />
                                    <p>Overall Rating</p>
                                  </div>
                                </div>
                                <div className="col-sm-12">
                                  <div className="row">
                                    <div className="col-6">
                                      <div className="bar-div">
                                        <CircularProgressWithLabel
                                          style={{ color: review.OVERALL_RATING.RENT_PAYMENTS_COLOR }}
                                          size="40px"
                                          thickness={5}
                                          text={Number(review.OVERALL_RATING.RENT_PAYMENTS)}
                                          value={Number(review.OVERALL_RATING.RENT_PAYMENTS_PERCENTAGE)}
                                        />
                                        <p>Rent Payments</p>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="bar-div">
                                        <CircularProgressWithLabel
                                          style={{ color: review.OVERALL_RATING.LEASE_EXPIRATION_COLOR }}
                                          size="40px"
                                          thickness={5}
                                          text={Number(review.OVERALL_RATING.LEASE_EXPIRATION)}
                                          value={Number(review.OVERALL_RATING.LEASE_EXPIRATION_PERCENTAGE)}
                                        />
                                        <p>Lease Expiration</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6">
                                      <div className="bar-div">
                                        <CircularProgressWithLabel
                                          style={{ color: review.OVERALL_RATING.PROPERTY_DAMAGE_COLOR }}
                                          size="40px"
                                          thickness={5}
                                          text={Number(review.OVERALL_RATING.PROPERTY_DAMAGE)}
                                          value={Number(review.OVERALL_RATING.PROPERTY_DAMAGE_PERCENTAGE)}
                                        />
                                        <p>Property Damage</p>
                                      </div>
                                    </div>
                                    <div className="col-6">
                                      <div className="bar-div">
                                        <CircularProgressWithLabel
                                          style={{ color: review.OVERALL_RATING.AFTER_MOVING_OUT_COLOR }}
                                          size="40px"
                                          thickness={5}
                                          text={Number(review.OVERALL_RATING.AFTER_MOVING_OUT)}
                                          value={Number(review.OVERALL_RATING.AFTER_MOVING_OUT_PERCENTAGE)}
                                        />
                                        <p>After Moving Out</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="detail-info">
                                <div className="detail-item">
                                  <p className="heading">Tenant Name</p>
                                  <p>{review.tenant_name}</p>
                                </div>
                                <div className="detail-item">
                                  <p className="heading">Date of Birth</p>
                                  <p>{review.tenant_dob}</p>
                                </div>
                                <div className="detail-item">
                                  <p className="heading">Property Address</p>
                                  <p>
                                    {review.address}, {review.city},{" "}
                                    {review.state}
                                  </p>
                                </div>
                                <div className="detail-item">
                                  <p className="heading">Length of Lease</p>
                                  <p>{review.lease_length}</p>
                                </div>
                                <div className="detail-item">
                                   <p style={{marginTop: '10px', fontSize: 'small'}}><i className="bx bx-time-five"></i> {review.ago}</p>
                                </div>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-8 col-lg-5">
                          <h2 className="expand-h">Tenant FAQ's</h2>
                          <div className="row">
                            <div className="col-md-12">
                              {review.ques_list.map((ques, i_) => {
                                return (
                                  <div key={'ques'+review.review_id+ques.ques_id} className="form-group">
                                    <div className="r-wrap">
                                      <div className="wrap-item">
                                        <label className="main-label">
                                          {i_+1}. {ques.ques}
                                        </label>
                                        <div className="rating-div">
                                          <p>Ratings:</p>
                                          <div className={"rate-"+ques.rating}>
                                            {
                                              ratingsList.map(rating => {
                                                return (<label><i className={'bx bxs-star ' + (rating > ques.rating ? 'empty' : '')} ></i></label>)
                                              })
                                            }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="imposter-wrap">
                                      {
                                        (ques.ans=='yes') ?
                                        <div className="custom-control custom-radio custom-imposter-checkbox">
                                          <input readOnly="true" type="radio" checked className="custom-control-input" id={'example'+review.review_id+'_'+ques.ques_id}
                                                 value="customEx"/>
                                          <label className="custom-control-label input-success" htmlFor={'example'+review.review_id+'_'+ques.ques_id}>Yes</label>
                                        </div>
                                        :
                                        
                                        <div className="custom-control custom-radio custom-imposter-checkbox">
                                          <input readOnly="true"  type="radio" checked className="custom-control-input" id={'example'+review.review_id+'_'+ques.ques_id}
                                                  value="customEx1"/>
                                          <label className="custom-control-label input-danger" htmlFor={'example'+review.review_id+'_'+ques.ques_id}>No</label>
                                        </div>
                                      }
                                      </div>
                                      
                                    </div>


                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-3">
                          <h2 className="expand-h">Landlord's Review</h2>
                          <div className="profile-div">
                            <img src={review.landlord_profile_photo ? ( review.landlord_profile_photo!=null ?  BASE_PATH_USERS+review.landlord_profile_photo : props.user) : props.user} />
                            <p>{review.landlord_name}</p>
                          </div>
                          <p className="review-p">{review.comment}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          {/* <button className="mainBtn">MORE DETAILS</button>*/}
                          <button className="mainBtn read-less" onClick={() => setIsDisplay((prev) => ({
                            ...prev,
                            [review.review_id]: false
                          }))}>
                            {" "}
                                BACK TO RESULT
                              </button>
                        </div>
                      </div>
                    </div>
                  )
                  let minView = (
                    <div className="search-card">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="row progress-row">
                            <div className="col-sm-4">
                              <div className="bar-div">
                                <CircularProgressWithLabel
                                  style={{ color: review.OVERALL_RATING.OVERALL_RATING_COLOR }}
                                  size="70px"
                                  font={20}
                                  thickness={4}
                                  text={review.OVERALL_RATING.OVERALL_RATING}
                                  value={review.OVERALL_RATING.OVERALL_RATING_PERCENTAGE}
                                />
                                <p>Overall Rating</p>
                              </div>
                            </div>
                            <div className="col-sm-8">
                              <div className="row">
                                <div className="col-6">
                                  <div className="bar-div">
                                    <CircularProgressWithLabel
                                      style={{ color: review.OVERALL_RATING.RENT_PAYMENTS_COLOR }}
                                      size="40px"
                                      thickness={5}
                                      text={Number(review.OVERALL_RATING.RENT_PAYMENTS)}
                                      value={Number(review.OVERALL_RATING.RENT_PAYMENTS_PERCENTAGE)}
                                    />
                                    <p>Rent Payments</p>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="bar-div">
                                    <CircularProgressWithLabel
                                      style={{ color: review.OVERALL_RATING.LEASE_EXPIRATION_COLOR }}
                                      size="40px"
                                      thickness={5}
                                      text={Number(review.OVERALL_RATING.LEASE_EXPIRATION)}
                                      value={Number(review.OVERALL_RATING.LEASE_EXPIRATION_PERCENTAGE)}
                                    />
                                    <p>Lease Expiration</p>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  <div className="bar-div">
                                    <CircularProgressWithLabel
                                      style={{ color: review.OVERALL_RATING.PROPERTY_DAMAGE_COLOR }}
                                      size="40px"
                                      thickness={5}
                                      text={Number(review.OVERALL_RATING.PROPERTY_DAMAGE)}
                                      value={Number(review.OVERALL_RATING.PROPERTY_DAMAGE_PERCENTAGE)}
                                    />
                                    <p>Property Damage</p>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="bar-div">
                                    <CircularProgressWithLabel
                                      style={{ color: review.OVERALL_RATING.AFTER_MOVING_OUT_COLOR }}
                                      size="40px"
                                      thickness={5}
                                      text={Number(review.OVERALL_RATING.AFTER_MOVING_OUT)}
                                      value={Number(review.OVERALL_RATING.AFTER_MOVING_OUT_PERCENTAGE)}
                                    />
                                    <p>After Moving Out</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="detail-info">
                            <div className="detail-item">
                              <p className="heading">Tenant Name</p>
                              <p>{review.tenant_name}</p>
                            </div>
                            <div className="detail-item">
                              <p className="heading">Date of Birth</p>
                              <p>{review.tenant_dob}</p>
                            </div>
                            <div className="detail-item">
                              <p className="heading">Property Address</p>
                              <p>{review.address}, {review.city},{" "}
                                {review.state}</p>
                            </div>
                            <div className="detail-item">
                              <p className="heading">Length of Lease</p>
                              <p>{review.lease_length}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <p className="time-p">
                            <i className="bx bx-time-five"></i> {review.ago}
                              </p>
                        </div>
                        <div className="col-6">
                          <button onClick={() => setIsDisplay((prev) => ({
                            ...prev,
                            [review.review_id]: true
                          }))} className="mainBtn">MORE DETAILS</button>
                        </div>
                      </div>
                    </div>
                  )
                  return (
                    <div key={'reviw' + review.review_id} className="row">
                      <div className="col-md-12">
                        {isDisplay[review.review_id] ? fullView : minView}
                      </div>
                    </div>
                  );
                })}
                {props.Reviews.length > 0 ?
                  (<div className="row">
                    <div className="col-md-12">
                      {
                        props.lastPage==props.currentPage ? '' : <button onClick={() => {props.loadMoreResults()}} className="load-more-btn">Load More</button>
                      }
                      
                    </div>
                  </div>)
                  : ''}

                  </div>
                  {
                    (!props.isLoggedIn && props.searchStatus==2) && (
                      <div className="row">
                          <div className="col-md-12">
                            <p className="note-p">
                              Please <Link to="/user/signup">Sign Up</Link> to view your search results
                            </p>
                        </div>
                      </div>
                    )
                  }
                  
        </div>
      </section>
      
       )
     }
      
      
    </>
  );
};
TenantSearch.propTypes = {};
export default TenantSearch;