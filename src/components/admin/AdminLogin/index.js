import { React ,Component, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import google from "../../../assets/images/google-icon.png"
import facebook from "../../../assets/images/Facebook Logo.png"
 
import {Field, Form, Formik} from "formik";
import {connect} from 'react-redux';
import * as Yup from "yup";
import {createAction, ActionNames} from '../../../services';
import {UserConstants} from '../../../constants/UserConstants';
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { createNotification } from "../../../helpers/notifications";
const AdminLogin = () => {
    const [passwordHide, SetPasswordHide] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();   
    const [prefillFormData, setPrefillForm] = useState({
            username: '',
            password: '',
            is_remember: false
    })
    const { isLoggedIn } = useSelector((state) => {
        return {
          isLoggedIn: state.authentication.admin?.loggedIn,
        };
      });
    if(isLoggedIn){
        history.push('/admin/dashboard')
    }

    useEffect(() => {
        
        let remember_me_admin_data = localStorage.getItem('remember_me_admin');
        if(remember_me_admin_data){
            remember_me_admin_data = JSON.parse(remember_me_admin_data);
            let newData  = {...prefillFormData};
            newData.username = remember_me_admin_data.username;
            newData.password = remember_me_admin_data.password;
            newData.is_remember = remember_me_admin_data.is_remember;
            setPrefillForm(newData)
        }
        
    },[])

        return (
            <div className="main-bg">
                <div className="login-link">
                    <h1>Admin Login</h1>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify="center">
                               
                            <div className="col-md-12 col-xl-9 col-xs-12 col-sm-12">
                              
                                <Formik
                                   initialValues={{
                                        username: prefillFormData.username,
                                        password: prefillFormData.password,
                                        remember_me: prefillFormData.is_remember,
                                    }}
                                    enableReinitialize
                                    validationSchema={Yup.object().shape({
                                        username: Yup.string().required("Username is Required"),
                                        password: Yup.string().required("Password is Required").matches(
                                            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                            "Incorrect Password"
                                          ),
                                        remember_me: Yup.bool(),
                                    })}
                                    validate={(values) => {
                                        const errors = {};
                                        
                                        return errors;
                                    }}
                                    onSubmit={async (values, {setSubmitting}) => {
                                        try {
                                            const result = await createAction(ActionNames.ADMIN_LOGIN, {
                                                ...values
                                            });
                                            result.payload.then(res => {
                                                const data = res.data;
                                                if (data.status == 'success') {
                                                    setSuccessMessage(data.message);
                                                    localStorage.setItem('llt_admin', data.token);

                                                    localStorage.setItem('llt_admin_obj', JSON.stringify(data.user));

                                                    dispatch({
                                                        type: UserConstants.ADMIN_LOGIN_SUCCESS,
                                                        payload: {
                                                            admin: data.token,
                                                        }
                                                    })
                                                    if(values.remember_me==true){
                                                        localStorage.setItem('remember_me_admin', JSON.stringify(
                                                            {
                                                                username: values.username,
                                                                password: values.password,
                                                                is_remember: values.remember_me
                                                            }
                                                        ))
                                                    }else{
                                                        localStorage.removeItem('remember_me_admin')
                                                    }
                                                    setTimeout(() => {
                                                        createNotification('success', 'Login successfully')
                                                    
                                                      history.push('/admin/dashboard');
                                                    }, 500);

                                                } else if (data.status == 'fail') {
                                                    setErrorMessages(data.errors)
                                                }
                                            })

                                        } catch (e) {
                                            console.log(e);
                                        }
                                    }}

                                >
                                    {({
                                          isSubmitting,
                                          values,
                                          errors,
                                          touched,
                                          handleChange,
                                          handleBlur,
                                          handleSubmit,
                                          /* and other goodies */
                                      }) => (
                                        <form onSubmit={handleSubmit} className="loginForm">
                                            <div className="form-group">
                                                <label htmlFor="email">Username:</label>
                                                <div className="input-group mb-3">
                                                    
                                                    <Field name="username">
                                                        {({field, meta}) => {
                                                            return (
                                                                <>
                                                                    <div className="container-text"
                                                                         style={{width: "75%"}}>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            {...field}
                                                                        />

                                                                    </div>
                                                                    {meta.touched && meta.error && (
                                                                        <p className="required">{meta.error}</p>
                                                                    )}
                                                                </>
                                                            );
                                                        }}
                                                    </Field>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="pwd">Password:</label>
                                                <Field name="password">
                                                    {({field, meta}) => {
                                                        return (
                                                            <div className="container-text">
                                                                <div class="input-group">
                                                                    <input
                                                                        type={
                                                                            passwordHide == true
                                                                              ? "password"
                                                                              : "text"
                                                                            }
                                                                        className="form-control"
                                                                        id="pwd"
                                                                        {...field}
                                                                    />
                                                                    <div class="input-group-prepend">
                                                                        <span
                                                                        class="input-group-text password_show_hide_icons"
                                                                        id="validationTooltipUsernamePrepend"
                                                                        >
                                                                        {passwordHide === true ? (
                                                                            <i
                                                                            class="bx bxs-show"
                                                                            onClick={() => SetPasswordHide(false) }
                                                                            ></i>
                                                                        ) : (
                                                                            <i
                                                                            class="bx bxs-hide"
                                                                            onClick={() => SetPasswordHide(true) }
                                                                            ></i>
                                                                        )}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                {meta.touched && meta.error && (
                                                                    <p className="required">{meta.error}</p>
                                                                )}
                                                            </div>
                                                        );
                                                    }}
                                                </Field>
                                            </div>
                                            <div className="form-group form-check">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                    <Field name="remember_me">
                                                        {({ field, meta }) => {
                                                            return (
                                                                <>
                                                                <label className="form-check-label">
                                                                    <input className="form-check-input"
                                                                    checked={values.remember_me}
                                                                    {...field}
                                                                            type="checkbox"/> Remember me
                                                                </label>
                                                                {meta.touched && meta.error && (
                                                                    <p className="required">{meta.error}</p>
                                                                )}
                                                            </>
                                                            );
                                                        }}
                                                    </Field>
                                                    </div>
                                                  
                                                </div>

                                            </div>
                                            {successMessage &&
                                            <h6 className="alert alert-success"> {successMessage} </h6>}
                                            {errorMessages.map(error => (
                                                <h3 className="alert alert-danger"> {error} </h3>
                                            ))}
                                            <button type="submit" onSubmit={handleSubmit}
                                                    disabled={isSubmitting}
                                                    className="btn btn-primary loginFormBtn">Login
                                            </button>

                                            
                                        </form>
                                    )}
                                </Formik>
                            </div>

                            </Grid>
                        </Grid>
                     
                    </Grid>
                </div>
            </div>
        );
    }
 
 
export default AdminLogin;