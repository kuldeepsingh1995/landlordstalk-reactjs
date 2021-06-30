import {React, Component, useState, useEffect, useCallback} from "react";
import user from "../../../assets/images/avatar.png";
import "./Sidebar.css"
import { ActionNames, createAction } from "../../../services";
import {BrowserRouter, Link, NavLink, useHistory, withRouter} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserConstants } from "../../../constants/UserConstants";

const Sidebar = (props) => {

    const [stats, setStats] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    


    const { dashboard_data } = useSelector((state) => {
        return {
            dashboard_data: state.dashboard.dashboard_data,
        };
    });

    
 
    
    function logout() {
        dispatch({
          type: UserConstants.ADMIN_LOGOUT,
        });
        history.replace('/admin-login')
    }
    
 
    
    return (

            <ul className="sidebar-menu admin-card">
                <li className="side-li profile-li" >
                    <a href="#" className="side-a">
                        <div className="profile-div">
                            <p>Admin</p>
                            <img src={user}/>
                        </div>
                    </a>
                    <a onClick={props.closeMenu} className="close-sidebar-btn">
                        <i className='bx bx-x'></i>
                    </a>
                </li>
                <li className="side-li admin-active" onClick={props.closeMenu}>
                    <NavLink to="/admin/dashboard" exact className="side-a"><i className='bx bxs-dashboard'></i> <span>Dashboard</span></NavLink>
                </li>
                <li className="side-li" onClick={props.closeMenu}>
                    <NavLink to="/admin/user-manager" exact className="side-a"><i className='bx bxs-user'></i> <span>Users Manager</span> <span className="count-admin-span">{ dashboard_data?.count_users}</span> </NavLink>
                </li>
                <li className="side-li" onClick={props.closeMenu}>
                    <NavLink to="/admin/review-manager" className="side-a"><i className='bx bxs-message-edit'></i> <span>Reviews Manager</span> <span className="count-admin-span">{ dashboard_data?.count_review}</span></NavLink>
                </li>
                
                <li className="side-li" onClick={props.closeMenu}>
                    <NavLink to="/admin/blog-manager" className="side-a"><i className='bx bxs-message-edit'></i> <span>Blog Manager</span> <span className="count-admin-span">{ dashboard_data?.count_blogs}</span></NavLink>
                </li>
                <li className="side-li" onClick={props.closeMenu}>
                    <NavLink to="/admin/contact-manager" className="side-a"><i className='bx bxs-message-edit'></i> <span>Contact Manager</span> <span className="count-admin-span">{ dashboard_data?.count_contacts}</span></NavLink>
                </li>
                <li className="side-li" onClick={props.closeMenu}>
                    <NavLink to="/admin/subscription-manager" className="side-a"><i className='bx bx-credit-card'></i>
                        <span>Subscriptions Manager</span> <span className="count-admin-span">0</span></NavLink>
                </li>
                <li className="side-li" onClick={props.closeMenu}>
                    <NavLink to="/admin/report-manager" className="side-a"><i className='bx bxs-pie-chart-alt-2'></i> <span>Reports</span></NavLink>
                </li>
                <li className="side-li logout-li" onClick={props.closeMenu}>
                    <a onClick={() => { logout() }} className="side-a"><i className='bx bx-log-out'></i> <span>Logout</span></a>
                </li>
            </ul>
    );
}

export default withRouter(Sidebar);