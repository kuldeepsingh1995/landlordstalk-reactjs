import {React, Component, useState, useCallback, useEffect} from "react";

import Logo from "../../../assets/images/logo.PNG";
import user from "../../../assets/images/avatar.png";
import icon from "../../../assets/images/icon.PNG";
import "./Topbar.css"
import {createNotification} from "../../../helpers/notifications";
import {useHistory, useLocation} from "react-router";
import {ActionNames, createAction} from "../../../services/actions";
import {Link} from "react-router-dom";
import {BASE_PATH_USERS} from "../../../helpers/UploadDirectory";
import {useDispatch, useSelector} from "react-redux";
import {UserConstants} from "../../../constants/UserConstants";
import {searchNotification} from '../../../helpers/searchNotifications';
import {setNotificationRead} from "../../../helpers/setNotificationRead";

const Topbar = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchMenu, setSearchMenu] = useState(false);
    const [searchCategory, setSearchCategory] = useState('');
    const [searchText, setSearchText] = useState('');
    const [startSearch, setStartSearch] = useState(0);
    const history = useHistory();
    const location = useLocation();

    // const [notifications, setNotications] = useState([]);
    const dispatch = useDispatch();
    const {notifications} = useSelector((state) => {
        return {
            notifications: state.notifications.admin,
        };
    });
    // const searchNotification = useCallback(async () => {

    // try {
    //     let search = {limit: 3}
    //     const fetching = createAction(ActionNames.ADMIN_NOTIFICATION_SEARCH, search, false);
    //     const resp_data = fetching.payload;
    //     resp_data.then((resp) => {
    //         setNotications(resp.data.data.data);
    //     })


    // } catch (e) {
    //     console.log(e);
    // }
    // });

    useEffect(() => {
        dispatch(searchNotification('admin'))
    }, [location.pathname]);

    function logout() {
        dispatch({
            type: UserConstants.ADMIN_LOGOUT,
        });
        history.replace('/admin-login')
    }

    function handleClick(event) {
        setAnchorEl(event.currentTarget)
    };

    function handleClose() {
        setAnchorEl(null)
    };

    function search() {
        console.log(searchText, 'searchText')
        if (searchCategory == '') {
           /* createNotification('info', "Please select search category")*/
        } else if (searchText == '') {
           /* createNotification('info', "Please enter serach text")*/
        } else {
            setStartSearch(0)
            var date = new Date();
            if (searchCategory == 'LandLords') {

                history.push(
                    {
                        pathname: 'user-manager',
                        search: '?TopSearchText=' + searchText,
                    })
            } else if (searchCategory == 'Tenants') {
                history.push(
                    {
                        pathname: 'review-manager',
                        search: '?TopSearchText=' + searchText,
                    })
            } else if (searchCategory == 'Reviews') {
                history.push(
                    {
                        pathname: 'review-manager',
                        search: '?TopSearchText=' + searchText,
                    })
            }
            setSearchText('')
        }
    }

    function openSearch(e){
        if(e.target.closest(".dropdownDiv") && !e.target.closest(".search-dropdown")){
            setSearchMenu(!searchMenu)
            console.log(e)
        }

    }
    useState(() => {
        if (startSearch == 1) {

        }
    }, [searchText, searchCategory, startSearch])
    return (
        <div className="admin-topbar ">
            <nav className={["navbar navbar-expand bg-light navbar-light"].join(" ")}>
                <button
                    className="navbar-toggler admin-toggle"
                    type="button"
                    onClick={props.openHandler}
                >
                    <img src={icon} className="toggle-img" />
                </button>

                <a className={["navbar-brand", "logoLink"].join(" ")} href="#"><img src={Logo}/> </a>
                {/* <a className={["navbar-brand",classes.adminLink].join(" ")} href="/admin"><img src={adminsvg} /> </a>*/}
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse align-items-center" id="collapsibleNavbar">
                    <ul className={["navbar-nav d-flex w-100 justify-content-end", "menuUl"].join(" ")}>


                        <li className={["nav-item dropdown", "dropdownDiv", "searchli"].join(" ")} onClick={openSearch}>

                            {/* className={["dropdown-menu","dropdownMenu search-bar"].join(" ")} */}
                            {searchMenu?(
                                <div className="search-dropdown">
                                    <div className="search-drop-div">
                                        <select onChange={(event) => setSearchCategory(event.target.value)}>
                                            <option value="">Category</option>
                                            <option value="LandLords">LandLords</option>
                                            <option value="Tenants">Tenants</option>
                                            <option value="Reviews">Reviews</option>
                                        </select>
                                        <input type="text" onKeyUp={(event) => setSearchText(event.target.value)}
                                               placeholder=""/>
                                    </div>
                                </div>
                            ):""}

                            {/* <a className="nav-link dropdown-toggle icon-a search-icon" onClick={() => search()} id="navbardrop" data-toggle="dropdown"> */}

                            <a className="nav-link search_button_topbar icon-a search-icon" onClick={() => 
                                {
                                    if(searchText==''){
                                        history.replace({
                                            search: '',
                                          })
                                    }else{
                                        search()
                                    }
                                }
                            }
                               id="navbardrop" >
                                <i className='bx bx-search'></i>
                            </a>

                        </li>
                        <li className={["nav-item dropdown active-drop-link noti-li", "dropdownDiv"].join(" ")}>
                            <a className="nav-link dropdown-toggle icon-a" href="#" id="navbardrop"
                               data-toggle="dropdown">
                                {
                                    (notifications?.unread_messages > 0) &&
                                    <span className="active-notification-icon">{notifications?.unread_messages}</span>
                                }
                                <i className='bx bx-bell'></i>
                            </a>
                            <div className={["dropdown-menu", "dropdownMenu"].join(" ")}>
                                <div className="notification-div">
                                    <div className="row">
                                        {
                                            notifications?.data.data.map(notification =>
                                                <div className="col-md-12">
                                                    <div className={"review-div notification_div_topbar" + (notification.is_read==1 ? ' review-viewed' : '')}  onClick={() => {
                                                        dispatch(setNotificationRead(notification.id, 'admin'))
                                                        switch (notification.for_action) {
                                                            case 'subscription_footer_submission':
                                                                history.push('/admin/contact-manager/' + notification.subject_id)
                                                                break;
                                                            case 'contact_us_submision':
                                                                history.push('/admin/contact-manager/' + notification.subject_id)
                                                                break;
                                                            case 'review_add':
                                                                history.push('/admin/review-manager/' + notification.subject_id)
                                                                break;
                                                            case 'review_edit':
                                                                history.push('/admin/review-manager/' + notification.subject_id)
                                                                break;
                                                            case 'landlord_new_registeration':
                                                                history.push('/admin/user-manager/' + notification.subject_id)
                                                                break;
                                                            default:
                                                                break;
                                                        }

                                                    }}>
                                                        {
                                                            (notification.get_user && notification.get_user != null) &&
                                                            <img
                                                                src={notification.get_user.profile_photo != null ? BASE_PATH_USERS + notification.get_user.profile_photo : user}/>
                                                        }

                                                        <div className="review-detail">
                                                            {(notification.get_user != null) &&
                                                            <h3>{notification.get_user.fname} {notification.get_user.lname}</h3>}
                                                            <p>{notification.title}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }


                                    </div>
                                    {
                                        (notifications?.data.data.length > 0) && (
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <Link to="/admin/notifications-manager" className="read-more-noty">Read
                                                        More</Link>
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        </li>
                        {/* <li className="nav-item other-pages">
                            <a className="nav-link" href="#">other pages</a>
                        </li>*/}
                        <li className={["nav-item dropdown login-btn-li login-btn-li-2", "dropdownDiv"].join(" ")}>
                            <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                <div className="profile-div">
                                    <img src={user}/>
                                </div>
                            </a>
                            <div className={["dropdown-menu", "dropdownMenu"].join(" ")}>
                                {/*<a className="dropdown-item" href="#">My Profile</a>
                                    <a className="dropdown-item" href="#">Settings</a>*/}
                                <a onClick={() => {
                                    logout()
                                }} className="dropdown-item">Logout</a>
                            </div>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    );
}


export default Topbar;