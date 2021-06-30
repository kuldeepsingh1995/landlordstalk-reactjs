import {React, Component, useState, useCallback, useEffect} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import user from "../../../assets/images/r.png";
import { BASE_PATH_USERS } from "../../../helpers/UploadDirectory";
import { createAction, ActionNames } from "../../../services";
import "./RightSidebar.css"

const RightSidebar =  () => {

    const { dashboard_data } = useSelector((state) => {
        return {
            dashboard_data: state.dashboard.dashboard_data,
        };
      });

       return (
            <div className="admin-card right-sidebar">
                <div className="row">
                    <div className="col-md-12">
                        <div className="admin-card-header">
                            <h1>Latest Reviews</h1>
                            <span className="admin-header-icon"><i className='bx bx-info-circle'></i></span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {
                        (dashboard_data?.data.length > 0) &&
                        dashboard_data?.data.map(review => {
                           return <div className="col-xl-12 col-lg-6 col-md-6">
                                <div className="review-div">
                                    <img src={review.get_landlord.profile_photo!=null ? BASE_PATH_USERS + review.get_landlord.profile_photo : user }/>
                                    <div className="review-detail">
                                        <h3>{review.get_landlord.fname} {review.get_landlord.lname}</h3>
                                        <p>{review.comment}</p>
                                    </div>
                                </div>
                            </div>
                            }
                        )
                    }
                    
                       

                    <div className="col-md-12 text-center">
                        <Link to="/admin/review-manager" className="more-reviews"><i className='bx bx-chevron-down'></i></Link>
                    </div>
                </div>
            </div>
        );
    }


export default RightSidebar;