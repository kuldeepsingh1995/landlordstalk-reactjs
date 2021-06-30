import React, {Component, useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import img1 from "../../../assets/images/1.PNG"
import img2 from "../../../assets/images/2.PNG"
import img3 from "../../../assets/images/3.PNG"
import img4 from "../../../assets/images/4.PNG"
import img5 from "../../../assets/images/5.PNG"
import google from "../../../assets/images/google-icon.png"
import facebook from "../../../assets/images/Facebook Logo.png"
import {Link, useHistory, withRouter} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {connect, useDispatch} from 'react-redux';
import * as Yup from "yup";
import {createAction, ActionNames} from '../../../services';
import {UserConstants} from '../../../constants/UserConstants';
import ReadyToReview from '../ReadyToReview';
import SocialMediaLogin from '../SocialMediaLogin';
import {createNotification} from "../../../helpers/notifications";
import { Helmet } from 'react-helmet';

const Login = () => {
    const history = useHistory();  
    const [passwordHide, SetPasswordHide] = useState(true);

    const [noticeMessage, setNoticeMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const [prefillFormData, setPrefillForm] = useState({
            username: '',
            password: '' ,
            is_remember: false
    })
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        
        let remember_me_user_data = localStorage.getItem('remember_me_user');
        if(remember_me_user_data){
            remember_me_user_data = JSON.parse(remember_me_user_data);
            let newData  = {...prefillFormData};
            newData.username = remember_me_user_data.username;
            newData.password = remember_me_user_data.password;
            newData.is_remember = remember_me_user_data.is_remember;

            setUsername(newData.username);
            setPrefillForm(newData)
        }
        
    },[])
  
    console.log(prefillFormData, 'pefill')
    return (
        <>
             <Helmet>
                <title>Login | Landlordstalk</title>
                <meta name="description" content="Login | Landlordstalk" />
            </Helmet>
            <section className="main-header-banner">
                <div className="container">
                    <div className="row d-flex justify-content-center text-center">
                        <div className="col-md-12 col-xl-7 col-xs-12 col-sm-12">
                            <h1 className="main-h1">Login</h1>
                            <Formik
                                initialValues={{
                                    username: username,
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
                                        setErrorMessages([])
                                        values.username = username
                                        const result = await createAction(ActionNames.LOGIN, {
                                            ...values
                                        });
                                        result.payload.then(res => {
                                            const data = res.data;
                                            if (data.status == 'success') {
                                                if(data.user.is_email_verified==1){
                                                    setSuccessMessage(data.message);
                                                    setNoticeMessage('')
                                                    localStorage.setItem('llt_user', data.token);
    
                                                    localStorage.setItem('llt_user_obj', JSON.stringify(data.user));
                                                    if(values.remember_me==true){
                                                        localStorage.setItem('remember_me_user', JSON.stringify(
                                                            {
                                                                username: values.username,
                                                                password: values.password,
                                                                is_remember: values.remember_me
                                                            }
                                                        ))
                                                    }else{
                                                        localStorage.removeItem('remember_me_user')
                                                    }
                                                    dispatch({
                                                        type: UserConstants.LOGIN_SUCCESS,
                                                        payload: {
                                                            user: data.token,
                                                            user_obj: data.user
                                                        }
                                                    })
                                                    setTimeout(() => {
                                                        createNotification('success', 'Login successfully')
                                                        history.push('/user');
                                                    }, 500);
                                                }else{
                                                    setNoticeMessage('Please click on verification link sent on your email address to login your account.');
                                                }
                                                

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
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">landlordtalks.com/</span>
                                                </div>
                                                <Field name="username">
                                                    {({field, meta}) => {
                                                        return (
                                                            <>
                                                                <div className="container-text"
                                                                        style={{width: "75%"}}>
                                                                    <input
                                                                        id="username"
                                                                        type="text"
                                                                        value={username}
                                                                        onKeyPress={(e) => {
                                                                            var x = e.which || e.keyCode;
                                                                            if(x==32){
                                                                                createNotification('warning', 'space are not allowed')
                                                                            }
                                                                        }}
                                                                        onChange={(e) => {
                                                                            setUsername(e.target.value.replace(/\s/g, ''));
                                                                            handleChange(e)
                                                                        }}
                                                                        className="form-control"
                                                                         
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
                                                <div className="col-md-6">
                                                    <Link to="/user/forget-password" className="forgotPara">Forgot password?</Link>
                                                </div>
                                            </div>

                                        </div>
                                        {successMessage &&
                                        <h6 className="alert alert-success"> {successMessage} </h6>}
                                        {noticeMessage &&
                                        <h6 className="alert alert-warning"> {noticeMessage} </h6>}
                                        {errorMessages.map(error => (
                                            <h3 className="alert alert-danger"> {error} </h3>
                                        ))}
                                        <button type="submit" onSubmit={handleSubmit}
                                                disabled={isSubmitting}
                                                className="btn btn-primary loginFormBtn">LOGIN
                                        </button>

                                        <div className="otherLoginOptions">
                                            <p>Or login/sign up with</p>
                                            <SocialMediaLogin></SocialMediaLogin>
                                            <p>Don't have an account?</p>
                                            <Link to="/user/signup" className="signup-btn">SIGN UP NOW</Link>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>
            <section className="howItWorks">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="section-h3">How It <span>Works</span></h3>
                            <div className="how">
                                <div className="howItem">
                                    <img src={img1}/>
                                    <div className="howInfo">
                                        <h3>sign up</h3>
                                        <p>Create your account</p>
                                    </div>
                                </div>
                                <div className="howItem">
                                    <img src={img2}/>
                                    <div className="howInfo">
                                        <h3>Review</h3>
                                        <p>Fill a form to review your tentant</p>
                                    </div>
                                </div>
                                <div className="howItem">
                                    <img src={img3}/>
                                    <div className="howInfo">
                                        <h3>share</h3>
                                        <p>Share it with other landlords</p>
                                    </div>
                                </div>
                                <div className="howItem">
                                    <img src={img4}/>
                                    <div className="howInfo">
                                        <h3>search</h3>
                                        <p>Seacrh for a tentant review</p>
                                    </div>
                                </div>
                                <div className="howItem">
                                    <img src={img5}/>
                                    <div className="howInfo">
                                        <h3>find</h3>
                                        <p>Find reviews for you desire tentant</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ReadyToReview></ReadyToReview>
        </>
    );
    }

Login.propTypes = {};

export default withRouter(connect()(Login));
