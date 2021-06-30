import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Login from "../Login/Login";
import Home from "../Home/Home";
import SignUp from "../SignUp/SignUp";
import NotFound from "../NotFound/NotFound";
import SearchTenants from "../SearchTenants/SearchTenants";
import ReviewProcess from "../ReviewProcess/ReviewProcess";
import LandLordSolutions from "../LandLordSolutions/LandLordSolutions";
import TenantScreeningProcess from "../TenantScreeningProcess/TenantScreeningProcess";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Blog from "../Blog/Blog";
import BlogDetails from "../BlogDetails/BlogDetails";
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import ForgetPassword from '../ForgetPassword';
import VerifyOtp from '../VerifyOtp';
import ChangePassword from '../ChangePassword';
import EditProfile from "../EditProfile/EditProfile";
import NotificationsManager from '../../NotificationsManager/NotificationsManager';
import TermsPage from '../TermsPage';
import VerifyEmail from '../VerifyEmail';
import SignupConfirmation from '../SignupConfirmation';
class Main extends Component {
    render() {
        console.log(localStorage.getItem('llt_user'));
        return (
            <div>
                <Switch>
                    <Route path="/user/home">
                        <Home />
                    </Route>

               

                 
                    

                    <Route path="/user/login">
                        <Login />
                    </Route>
                    <Route path="/user/signup">
                        <SignUp />
                    </Route>
                    <Route path="/user/signup-confirmation/:landlord_id">
                        <SignupConfirmation />
                    </Route>
                    <Route path="/user/search-tenants">
                        <SearchTenants />
                    </Route>
                    <Route path="/user/review-process">
                        <ReviewProcess />
                    </Route>
                    <Route exact  component={LandLordSolutions}  path="/user/landlord-solutions">
                    </Route>
                    <Route path="/user/tenant-screening-process">
                        <TenantScreeningProcess />
                    </Route>
                    <Route path="/user/about">
                        <About />
                    </Route>
                    <Route path="/user/contact">
                        <Contact />
                    </Route>
                    <Route path="/user/blogs">
                        <Blog />
                    </Route>
                    <Route path="/user/blog/:slug">
                        <BlogDetails />
                    </Route>
                    <Route path="/user/forget-password">
                        <ForgetPassword />
                    </Route>
                    <Route path="/user/verify-otp">
                        <VerifyOtp />
                    </Route>
                    <Route path="/user/change-password">
                        <ChangePassword />
                    </Route>
                    <Route path="/user/terms">
                        <TermsPage />
                    </Route>
                    <Route path="/user/verify_email/:id">
                        <VerifyEmail />
                    </Route>
                    <PrivateRoute path="/user/notifications-manager"  component={(props) => <NotificationsManager {...props} user_type="user" />}> 
                     
                    </PrivateRoute>
               
                    <PrivateRoute path="/user/edit-profile" component={EditProfile}>
                    </PrivateRoute>
                    <Route path="/user" exact component={Home} >
                    </Route>
                    <Route path="/" exact component={Home} >
                    </Route>
                    <Route path="/user">
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        );
    }
}
Main.propTypes = {};
export default Main;