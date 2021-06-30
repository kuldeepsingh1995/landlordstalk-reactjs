import { React ,Component } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import adminsvg from '../../svg/admin-portal.svg';
import usersvg from '../../svg/user.svg';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { useSelector } from "react-redux";
const Login = () => {
    const { isLoggedIn } = useSelector((state) => {
        return {
          isLoggedIn: state.authentication.user?.loggedIn,
        };
      });
   
    
   
        return (
            <div className="main-bg">
                <div className="login-link">
                    <h1>Click On One of the Links Below</h1>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Grid container justify="center">
                                <Link to="/admin-login">
                                    <Grid item>
                                        <img className="svg" src={adminsvg}/>
                                        <h2><a href="#">Admin Portal</a></h2>
                                    </Grid>
                                </Link>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Grid container justify="center">
                                <Link  to={isLoggedIn ? "/user" : "/user/login" }>
                                    <Grid item>
                                        <img className="svg" src={usersvg}/>
                                        <h2><a href="#">User Portal</a></h2>
                                    </Grid>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }

export default Login;