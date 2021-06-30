import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateAdminRoute = ({ component: Component, ...rest }) => (
    localStorage.getItem('llt_admin') ? 

    <Route {...rest} render={props => (
        
            <Component {...props} />
            
    )} />
    : <Redirect to={{ pathname: '/admin-login'  }} />
)
