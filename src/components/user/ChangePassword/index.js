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
const ChangePassword = (props) => {
    const history = useHistory();
    const [passwordHide, SetPasswordHide] = useState(true);
    const [confirmPasswordHide, SetConfirmPasswordHide] = useState(true);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
         return (
            <>
             <Helmet>
                    <title>Change Password | Landlordstalk</title>
                    <meta name="description" content="Change Password | Landlordstalk" />
                </Helmet>
                <section className="main-header-banner">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-md-7">
                                <h1 className="main-h1">Change Passowrd</h1>
                                <Formik
                                    initialValues={{
                                        password: "",
                                        c_password: ""
                                    }}
                                    validationSchema={Yup.object().shape({
                                        password: Yup.string().required("Password is Required").matches(
                                            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                                          ),
                                        c_password: Yup.string().required("Confirm password is Required").test('passwords-match', 'Password and confirm password should same !',  function (value) {
                                            return this.parent.password === value;
                                          }).matches(
                                            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                                          ),

                                    })}
                                    validate={(values) => {
                                        const errors = {};
                                        
                                        return errors;
                                    }}
                                    onSubmit={async (values, {setSubmitting}) => {
                                        // return false;
                                        try {
                                            values.email = localStorage.getItem('forget_password_email')
                                            
                                            const result = await createAction(ActionNames.USER_CHANGE_PASSWORD, {
                                                ...values
                                            });
                                            result.payload.then(res => {
                                                const data = res.data;
                                                if (data.status == 'success') {
                                                    setSuccessMessage(data.message);
                                                      setTimeout(() => {
                                                        history.push('login')
                                                     }, 3000);

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
                                                <label htmlFor="password">Password:</label>
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

                                            <div className="form-group">
                                                <label htmlFor="c_password">Confirm Password:</label>
                                                <Field name="c_password">
                                                    {({field, meta}) => {
                                                        return (
                                                            <div className="container-text">
                                                                <div class="input-group">
                                                                    <input
                                                                        type={
                                                                            confirmPasswordHide == true
                                                                            ? "password"
                                                                            : "text"
                                                                            }
                                                                        className="form-control"
                                                                        {...field}
                                                                    />
                                                                    <div class="input-group-prepend">
                                                                        <span
                                                                        class="input-group-text password_show_hide_icons"
                                                                        id="validationTooltipUsernamePrepend"
                                                                        >
                                                                        {confirmPasswordHide === true ? (
                                                                            <i
                                                                            class="bx bxs-show"
                                                                            onClick={() => SetConfirmPasswordHide(false) }
                                                                            ></i>
                                                                        ) : (
                                                                            <i
                                                                            class="bx bxs-hide"
                                                                            onClick={() => SetConfirmPasswordHide(true) }
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
                                            {successMessage &&
                                            <h6 className="alert alert-success"> {successMessage} </h6>}
                                            {errorMessages.map(error => (
                                                <h3 className="alert alert-danger"> {error} </h3>
                                            ))}
                                            <button type="submit" onSubmit={handleSubmit}
                                                    disabled={isSubmitting}
                                                    className="btn btn-primary loginFormBtn">Change Password
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

ChangePassword.propTypes = {};

export default withRouter(connect()(ChangePassword));
