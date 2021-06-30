import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Topbar from "../components/user/Topbar/Topbar";
import Main from "../components/user/Main/Main";
import Footer from "../components/user/Footer/Footer";

import axios from 'axios';

axios.defaults.headers.Authorization = localStorage.getItem('llt_user') ? 'Bearer ' + localStorage.getItem('llt_user') : ''


class UserLayout extends Component {


    

    render() {
        return (
             <div className="main-user-layout">
                <div className="topbar">
                    <Topbar/>
                </div>
                <div className="main-section">
                    <Main/>
                </div>
                <div className="footer">
                    <Footer/>
                </div>
            </div>
         );
    }

}

UserLayout.propTypes = {};

export default UserLayout;
