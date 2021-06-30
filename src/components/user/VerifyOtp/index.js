import React, {Component, useState} from 'react';
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
import {connect} from 'react-redux';
import * as Yup from "yup";
import {createAction, ActionNames} from '../../../services';
import {UserConstants} from '../../../constants/UserConstants';
import ReadyToReview from '../ReadyToReview';
import { Helmet } from 'react-helmet';

const Login = () => {
    const history = useHistory();  
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
         return (
            <>
            <Helmet>
                <title>Verify OTP | Landlordstalk</title>
                <meta name="description" content="Verify OTP | Landlordstalk" />
            </Helmet>
                <section className="main-header-banner">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-md-7">
                                <h1 className="main-h1">Verify OTP</h1>
                                <Formik
                                    initialValues={{
                                        otp: "",
                                    }}
                                    validationSchema={Yup.object().shape({
                                        otp: Yup.string().required("OTP is Required"),
                                    })}
                                    validate={(values) => {
                                        const errors = {};
                                
                                        return errors;
                                    }}
                                    onSubmit={async (values, {setSubmitting}) => {
                                        try {
                                            values.email = localStorage.getItem('forget_password_email');
                                            const result = await createAction(ActionNames.USER_RESET_PASSWORD, {
                                                ...values
                                            });
                                            result.payload.then(res => {
                                                const data = res.data;
                                                if (data.status == 'success') {
                                                    setSuccessMessage("Password Recovered Successfully")
                                                    setTimeout(() => {
                                                        history.push('change-password');
                                                    }, 1000);

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
                                                <label htmlFor="otp">OTP</label>
                                                <Field name="otp">
                                                    {({field, meta}) => {
                                                        return (
                                                            <div className="container-text">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    {...field}
                                                                />
                                                                {meta.touched && meta.error && (
                                                                    <p className="required">{meta.error}</p>
                                                                )}
                                                            </div>
                                                        );
                                                    }}
                                                </Field>
                                            </div>
                                         
                                            {successMessage &&
                                            <h6 className="alert alert-success"> {successMessage} </h6>}
                                            {errorMessages.map(error => (
                                                <h3 className="alert alert-danger"> {error} </h3>
                                            ))}
                                            <button type="submit" onSubmit={handleSubmit}
                                                    disabled={isSubmitting}
                                                    className="btn btn-primary loginFormBtn">Verify
                                            </button>
 
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </section>
                 
             </>
        );
    }
 

Login.propTypes = {};

export default withRouter(connect()(Login));
