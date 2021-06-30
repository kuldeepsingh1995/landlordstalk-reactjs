import {React, Component, useState, useEffect, useCallback} from "react";
import graphimg from "../../../assets/images/graph.PNG"
import "./MainHome.css"
import {Route, Switch} from "react-router-dom";
import NotFound from "../../user/NotFound/NotFound";
import Dashboard from "../Dashboard/Dashboard";
import UserManager from "../UserManager/UserManager";
 import AdminLogin from "../AdminLogin";
import { ActionNames, createAction } from "../../../services";
import UpdateReview from "../UpdateReview";
import NotificationsManager from "../../NotificationsManager/NotificationsManager";
import UserDetails from "../UserDetails/index";
const Mainhome = () => {


    return (
        <>
            <Switch>
                <Route path="/admin/dashboard">
                    <Dashboard />
                </Route>
                <Route path="/admin/user-manager" exact>
                    <UserManager />
                </Route>
              
             
                <Route path="/admin/user-manager/:id">
                    <UserDetails />
                </Route>
            
              

           
                
                <Route path="/admin/update-review/:id">
                    <div className="admin-review">
                        <UpdateReview user_type1="admin"/>
                    </div>

                </Route>
                
                <Route path="/admin/notifications-manager">
                    <NotificationsManager  user_type='admin' />
                </Route>
               
                
                <Route path="/admin-login" >
                    <AdminLogin />
                </Route>
                <Route path="/admin" exact>
                    <Dashboard />
                </Route>
                <Route path="/admin">
                    <NotFound />
                </Route>
            </Switch>
        </>
    );
}

export default Mainhome;