import React, { Component, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch, useSelector } from "react-redux";
import Logo from "../../../assets/images/logo.PNG";
import adminsvg from "../../../assets/images/adminLogo.PNG";
import classes from "./Topbar.module.css";
import icon from "../../../assets/images/icon.PNG";
import { Link, NavLink, useHistory, useLocation, withRouter } from "react-router-dom";
import { UserConstants } from "../../../constants/UserConstants";
import { ActionNames, createAction } from "../../../services/actions";
import user from "../../../assets/images/avatar.png";
import UserAvatar from "../../UserAvatar";
import { BASE_PATH_USERS } from "../../../helpers/UploadDirectory";
import { searchNotification } from "../../../helpers/searchNotifications";
import { setNotificationRead } from "../../../helpers/setNotificationRead";

const Topbar = () => {
  const dispatch = useDispatch();
  // const [notfications, setNotications] = useState([]);
  const location = useLocation();

  
  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.authentication.user?.loggedIn,
    };
  });
  const { user_obj } = useSelector((state) => {
    return {
      user_obj: state.authentication.user?.user_obj,
    };
  });

  const { notifications } = useSelector((state) => {
    return {
      notifications: state.notifications.user,
    };
  });
 const history = useHistory();
console.log(notifications)

  // const searchNotification = useCallback(async () => {
        
  //   try {
  //       let user_ = localStorage.getItem('llt_user_obj');
  //       user_ = JSON.parse(user_)
  //       let search = {limit: 3, landlord_id: user_.landlord_id}
  //       const fetching = createAction(ActionNames.ADMIN_NOTIFICATION_SEARCH, search, false);
  //       const resp_data = fetching.payload;
  //       resp_data.then((resp) => {
  //           setNotications(resp.data.data.data);
  //       })

  //   } catch (e) {
  //       console.log(e);
  //   }
  // });

  console.log(isLoggedIn, 'isLoggedIn')

  // useEffect(() => {
  //   // if(isLoggedIn){
  //   //   // searchNotification()
  //   //   dispatch(searchNotification('user'));
  //   // }
  // }, [isLoggedIn]);

  useEffect(() => {
    if(isLoggedIn){
      dispatch(searchNotification('user'));
    }
    
    
    var how_it_work_dropdown_main = document.getElementsByClassName('how_it_work_dropdown')[0];
    if(location.pathname=='/user/landlord-solutions' || location.pathname=='/user/review-process'  || location.pathname=='/user/tenant-screening-process') {
      
    }else{
      how_it_work_dropdown_main.classList.remove("active");
    }

}, [location.pathname]);
  // const [token, setToken] = this.state;
  //     if(!token) {
  //        console.log("No Login")
  //     }
  
  function logout(){
      console.log('logout click')
    
      dispatch({
        type: UserConstants.LOGOUT,
       })
       history.push('/user/login')
  }

  

    return (
      <nav
        className={[
          "navbar navbar-expand-lg bg-light navbar-light",
          classes.menuBar,
        ].join(" ")}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <img src={icon} className="toggle-img" />
        </button>
        <Link className={["navbar-brand", classes.logoLink].join(" ")} to="/user">
          <img src={Logo} />{" "}
        </Link>
        {!isLoggedIn ? (
            <li className="nav-item login-btn-li mb-show">
              <NavLink className="nav-link login-btn" to="/user/login">
                LOGIN/SIGN UP
              </NavLink>
            </li>
        ) : (
            <li className={["nav-item dropdown", classes.dropdownDiv].join(" ")} className="nav-item login-btn-li mb-show">
              <a href="#"    className="nav-link"
                 id="navbardrop"
                 data-toggle="dropdown">
                <div className="profile-div top-profile" >
                  <img src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg" />
                  <p>{user_obj?.fname}</p>
                  <i className='bx bx-chevron-down'></i>
                </div>
              </a>
              <div className={["dropdown-menu", classes.dropdownMenu].join(" ")}>
                  <Link to="/user/edit-profile" className="dropdown-item" >
                    My Profile
                  </Link>
                  <Link to="/user/review-manager" className="dropdown-item" >
                    My Reviews
                  </Link>
                  <a onClick={() => {
                    logout();
                  }} className="dropdown-item" >
                    Logout
                  </a>
                
              </div>
            </li>
        )}


        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className={["navbar-nav d-flex w-100", classes.menuUl].join(" ")}>
            <li className={["nav-item"].join(" ")}>
              <NavLink className="nav-link" exact to="/user" id="navbardrop" onClick={()=>{document.querySelector("#collapsibleNavbar").classList.remove("show")}}>
                Home
              </NavLink>
            </li>
            <li
              className={[
                "nav-item dropdown active-drop-link",
                classes.dropdownDiv,
              ].join(" ")}
            >
              
              <NavLink
                className={"nav-link dropdown-toggle how_it_work_dropdown " + ((location.pathname=='/user/landlord-solutions' || location.pathname=='/user/review-process'  || location.pathname=='/user/tenant-screening-process') ? 'active' : '')}
                to="#"
                id="navbardrop"
                data-toggle="dropdown"
                 >
                How it works
              </NavLink>
              <div
                className={["dropdown-menu", classes.dropdownMenu].join(" ")}
              >
                <NavLink
                  className="dropdown-item"
                  to="/user/landlord-solutions"
                  onClick={()=>{document.querySelector("#collapsibleNavbar").classList.remove("show")}}
                >
                  landlord solutions
                </NavLink>
                <NavLink className="dropdown-item" to="/user/review-process" onClick={()=>{document.querySelector("#collapsibleNavbar").classList.remove("show")}}>
                  review process
                </NavLink>
                <NavLink
                    onClick={()=>{document.querySelector("#collapsibleNavbar").classList.remove("show")}}
                  className="dropdown-item"
                  to="/user/tenant-screening-process"
                >
                  tenant screening process
                </NavLink>
              </div>
            </li>
            {/* <li
              className={["nav-item dropdown", classes.dropdownDiv].join(" ")}
            >
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbardrop"
                data-toggle="dropdown"
              >
                Blog
              </NavLink>
              <div
                className={["dropdown-menu", classes.dropdownMenu].join(" ")}
              >
                <NavLink className="dropdown-item" to="/user/blogs">
                  post listing page
                </NavLink>
                <NavLink className="dropdown-item" to="/user/blog-detail">
                  single post page
                </NavLink>
              </div>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/user/blogs" onClick={()=>{document.querySelector("#collapsibleNavbar").classList.remove("show")}}>
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/user/about" onClick={()=>{document.querySelector("#collapsibleNavbar").classList.remove("show")}}>
                about
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/user/contact" onClick={()=>{document.querySelector("#collapsibleNavbar").classList.remove("show")}}>
                contact
              </NavLink>
            </li>
            {/* <li className="nav-item other-pages">
                            <Link className="nav-link" to="#">other pages</Link>
                        </li>*/}
            {(isLoggedIn) &&
            <li className={["nav-item dropdown active-drop-link noti-li", "dropdownDiv"].join(" ")} style={{'margin-left' : 'auto'}}>
                <a className="nav-link  dropdown-toggle dropdown-notification icon-a" href="#" id="navbardrop" data-toggle="dropdown">
                    {
                        (notifications?.unread_messages > 0) && 
                        <span className="active-notification-icon">{notifications?.unread_messages}</span>
                    }
                    <i className='bx bx-bell'></i>
                </a>
                <div className={["dropdown-menu", "dropdownMenu"].join(" ")}>
                    <div className="notification-div">
                        <div className="row">
                            {  notifications?.data.data.map(notification => 
                                    <div className={'col-md-12 '} >
                                        <div className={"review-div notification_div_topbar" + (notification.is_read==1 ? ' review-viewed' : '')} onClick={() => {
                                                        dispatch(setNotificationRead(notification.id, 'user'))
                                                        switch (notification.for_action) {
                                                            case 'review_add':
                                                                history.push('/user/review-manager/'+notification.subject_id)
                                                                break;
                                                            case 'review_edit':
                                                                history.push('/user/review-manager/'+notification.subject_id)
                                                                break;
                                                            // case 'admin_delete_review':
                                                            //       history.push('/user/review-manager/'+notification.subject_id)
                                                            //       break;
                                                            case 'admin_approve_review':
                                                                  history.push('/user/review-manager/'+notification.subject_id)
                                                                  break;
                                                            case 'admin_disapprove_review':
                                                                  history.push('/user/review-manager/'+notification.subject_id)
                                                                  break;
                                                            case 'landlord_new_registeration':
                                                                history.push('/user/edit-profile')
                                                                break;
                                                            default:
                                                                break;
                                                        }
                                                        }}>
                                            <img src={(notification.get_user)  ? (notification.get_user.profile_photo!=null ? BASE_PATH_USERS + notification.get_user.profile_photo : user)  : user} />
                                            <div className="review-detail">
                                                {(notification.get_user!=null) && <h3>{notification.get_user.fname} {notification.get_user.lname}</h3>}
                                                <p>{notification.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            
                              
                        </div>
                        {
                          (notifications?.data.data.length > 0) ? (
                            <div className="row">
                                <div className="col-md-12">
                                    <Link to="/user/notifications-manager" className="read-more-noty" onClick={()=>{document.querySelector("#collapsibleNavbar").classList.remove("show")}}>Read More</Link>
                                </div>
                            </div>
                          )
                          :
                          (
                            <div className="row">
                                <div className="col-md-12">
                                    <p className="required" style={{marginLeft: '10px'}}>No notfications</p>
                                </div>
                            </div>
                          ) 
                        }
                       
                    </div>
                </div>
            </li>
            }
            {!isLoggedIn ? (
              <li className={"nav-item login-btn-li " + (isLoggedIn ? '' : 'login-btn-li-margin-left-auto')}>
                <NavLink onClick={()=>{document.querySelector("#collapsibleNavbar").classList.remove("show")}} className="nav-link login-btn" to="/user/login">
                  LOGIN/SIGN UP
                </NavLink>
              </li>
            ) : (

              <li className={["nav-item dropdown", classes.dropdownDiv].join(" ")} className="mb-show2 nav-item login-btn-li">
                <a href="#"    className="nav-link"
                id="navbardrop"
                data-toggle="dropdown">

                  <div className="profile-div top-profile" >
                    <UserAvatar></UserAvatar>
                    <i className='bx bx-chevron-down'></i>
                  </div>
                </a>
                <div className={["dropdown-menu", classes.dropdownMenu].join(" ")}>
                  <Link onClick={()=>{document.querySelector("#collapsibleNavbar").classList.remove("show")}} to="/user/edit-profile" className="dropdown-item" >
                    My Profile
                  </Link>
                  <Link onClick={()=>{document.querySelector("#collapsibleNavbar").classList.remove("show")}} to="/user/review-manager" className="dropdown-item" >
                    My Reviews
                  </Link>
                  <a onClick={() => {
                    logout();
                    document.querySelector("#collapsibleNavbar").classList.remove("show")
                  }} className="dropdown-item" >
                    Logout
                  </a>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }

Topbar.propTypes = {};

// const mapStateToProps = (state) => {
//   return {
//     isLoggedIn: state.authentication.user?.loggedIn,
//     user_obj: state.authentication.user?.user_obj,
//   };
// };

export default withRouter(connect()(Topbar));
