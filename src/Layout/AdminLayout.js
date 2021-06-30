import React, {Component, useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Topbar from "../components/admin/Topbar/Topbar";
import Sidebar from "../components/admin/Sidebar/Sidebar";
import Mainhome from "../components/admin/MainHome/Mainhome";
import RightSidebar from "../components/admin/RightSidebar/RightSidebar";
import {Route, Switch, useLocation} from "react-router-dom";
import AdminLogin from '../components/admin/AdminLogin';
import axios from 'axios';
import Dashboard from '../components/admin/Dashboard/Dashboard';
import { ActionNames, createAction } from '../services';
import { useDispatch } from 'react-redux';
import { UserConstants } from '../constants/UserConstants';
import { searchNotification } from '../helpers/searchNotifications';
import { Helmet } from 'react-helmet';
// axios.defaults.headers.Authorization = localStorage.getItem('llt_admin') ? 'Bearer ' + localStorage.getItem('llt_admin') : ''

const AdminLayout = () => {
    

    const [open, setOpen] = useState(false);
    const [smScreen, setSmScreen] = useState(false);
     const dispatch = useDispatch();
   
    const searchStats = useCallback(async () => {
        
        try {
            const fetching = createAction(ActionNames.ADMIN_DASHBOARD, {}, false);
            const resp_data = fetching.payload;
            resp_data.then((resp) => {

                dispatch({
                    type: UserConstants.SET_DASHBOARD_DATA,
                    payload: resp.data
                })
            })
            
    
        } catch (e) {
            console.log(e);
        }
    });
    
    useEffect(() => {
        searchStats()
        var myFunction=(x)=> {
            if (x.matches) {
                setSmScreen(!smScreen)
            }
        }

        var x = window.matchMedia("(max-width: 992px)")
        myFunction(x)
        x.addListener(myFunction)
    }, []);
    

   

    function openMenu() {
        setOpen(!open)
    }
 
    // componentDidMount(){
      
    // }

  
        console.log(smScreen)
        return (
            <div className="main-admin-layout">
                <Helmet>
                    <title>Admin | Landlordstalk</title>
                    <meta name="description" content="Admin | Landlordstalk" />
                </Helmet>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="admin-topbar-wrap">
                                <Topbar openHandler={openMenu}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <Switch>
                        <Route path="/admin/dashboard">
                            <div className="row">
                                    <div className={[smScreen?"":"col-xl-3 col-lg-4 col-md-4"]}>
                                        <div className={["sidebar",open?"sidebar-open":""].join(" ")}>
                                            <Sidebar closeMenu={openMenu}/>
                                        </div>
                                    </div>

                                <div className={[smScreen?"col-md-12":"col-xl-6 col-lg-8 col-md-8"]}>
                                    <div className="main-section">
                                        <Dashboard/>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-12">
                                    <RightSidebar/>
                                </div>
                            </div>
                        </Route>
                        <Route path="/admin" exact>
                            <div className="row">


                                    <div className={[smScreen?"":"col-xl-3 col-lg-4 col-md-4"]}>
                                        <div className={["sidebar",open?"sidebar-open":""].join(" ")}>
                                            <Sidebar closeMenu={openMenu}/>
                                        </div>
                                    </div>

                                     

                                <div className={[smScreen?"col-md-12":"col-xl-9 col-lg-8 col-md-8"]}>
                                    <div className="main-section">
                                        <div /* className={[smScreen?"container-fluid":"container"]}*/ >
                                            <div className="row">
                                                <div className="col-xl-8 col-lg-12">
                                                    <Mainhome/>
                                                </div>
                                                <div className="col-xl-4 col-lg-12">
                                                    <RightSidebar/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Route>
                        <Route path="/admin">
                            <div className="row">


                                    <div className={[smScreen?"":"col-xl-3 col-lg-4 col-md-4"]}>
                                        <div className={["sidebar",open?"sidebar-open":""].join(" ")}>
                                            <Sidebar closeMenu={openMenu}/>
                                        </div>
                                    </div>


                                <div className={[smScreen?"col-md-12":"col-xl-9 col-lg-8 col-md-8"]}>
                                    <div className="main-section">
                                        <Mainhome/>
                                    </div>
                                </div>

                            </div>
                        </Route>
                        <Route path="/admin-login">
                            <div className="row">

                                <div className={[smScreen?"col-md-12":"col-xl-9 col-lg-8 col-md-8"]}>
                                    <div className="main-section">
                                        <AdminLogin/>
                                    </div>
                                </div>

                            </div>
                        </Route>
                    </Switch>

                </div>
                <div className="footer">

                </div>
            </div>
        );
    }
 
AdminLayout.propTypes = {};

export default AdminLayout;
