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
const Login = (props) => {
    const history = useHistory();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
         return (
            <>
                <Helmet>
                    <title>Forget Password | Landlordstalk</title>
                    <meta name="description" content="Forget Password | Landlordstalk" />
                </Helmet>
                <section className="main-header-banner">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-md-7">
                                <h1 className="main-h1">Forget Passowrd</h1>
                                <Formik
                                    initialValues={{
                                        email: "",
                                    }}
                                    validationSchema={Yup.object().shape({
                                        email: Yup.string().required("Email is Required"),
                                    })}
                                    validate={(values) => {
                                        const errors = {};
                                        if (!values.email) {
                                            //   errors.email = "Required";
                                            } else if (
                                              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                                values.email
                                              )
                                            ) {
                                              errors.email = "Invalid email address";
                                            }
                                        return errors;
                                    }}
                                    onSubmit={async (values, {setSubmitting}) => {
                                         // return false;
                                        try {
                                            const result = await createAction(ActionNames.USER_FORGET_PASSWORD, {
                                                ...values
                                            });
                                            result.payload.then(res => {
                                                const data = res.data;
                                                if (data.status == 'success') {
                                                      setTimeout(() => {
                                                       history.push('verify-otp');
                                                        localStorage.setItem('forget_password_email', values.email)
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
                                                <label htmlFor="email">Email:</label>
                                                <Field name="email">
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
                                                    className="btn btn-primary loginFormBtn">Send Email
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
