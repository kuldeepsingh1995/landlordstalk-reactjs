import React, { useCallback, useEffect, Component, useState } from "react";
import footerLogo from "../../../assets/images/footerLogo.PNG"
import footerCopy from "../../../assets/images/footer-copy.PNG"
import {Link,useHistory,withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import{ createAction, ActionNames } from '../../../services';
const Footer = (props) => {
        const history = useHistory();
         const [successMessage, setSuccessMessage] = useState("");
        const [errorMessages, setErrorMessages] = useState([]);
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-12">
                            <div className="row">
                                <div className="col-md-3">
                                  <img src={footerLogo} className="footer-logo"/>
                                </div>
                                <div className="col-md-3 col-4">
                                    <ul className="footer-ul s-padding">
                                        <li><a 
                                               onClick={() => {
                                                history.push('/user')
                                                window.scrollTo(0,0)

                                                }}
                                         >Home</a> </li>
                                        <li><a 
                                               onClick={() => {
                                                history.push('/user/blogs')
                                                window.scrollTo(0,0)

                                                }}
                                         >Blog</a> </li>
                                        <li><a 
                                               onClick={() => {
                                                history.push('/user/about')
                                                window.scrollTo(0,0)

                                                }}
                                         >About</a> </li>
                                        <li><a 
                                               onClick={() => {
                                                history.push('/user/contact')
                                                window.scrollTo(0,0)

                                                }}
                                         >Contact</a> </li>
                                    </ul>
                                </div>
                                <div className="col-md-5 col-8">
                                    <ul className="footer-ul">
                                        <li><a 
                                               onClick={() => {
                                                history.push('/user/landlord-solutions')
                                                window.scrollTo(0,0)

                                                }}
                                         >Landlord Solutions</a> </li>
                                        <li><a 
                                               onClick={() => {
                                                history.push('/user/tenant-screening-process')
                                                window.scrollTo(0,0)

                                                }}
                                         >Tenant Screening Process</a> </li>
                                        <li><a 
                                               onClick={() => {
                                                history.push('/user/review-process')
                                                window.scrollTo(0,0)

                                                }}
                                         >Review Process</a> </li>
                                        <li><a 
                                               onClick={() => {
                                                history.push('/user/terms')
                                                window.scrollTo(0,0)

                                                }}
                                         >Terms & Conditions</a> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="news-div">
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
                                        )
                                        {
                                            errors.email = "Invalid email address";
                                        }
                                        return errors;
                                    }}
                                    onSubmit={async (values, { setSubmitting,resetForm }) => {
                                        setSuccessMessage('Newsletter Subscribed Successfully');
                                       resetForm();
                                        try {
                                        const result= await createAction(ActionNames.SUBSCRIBE_NEWSLETTER, {
                                            ...values
                                        });
                                        result.payload.then(res => {
                                            const data = res.data;
                                            if(data.status=='success'){
                                            setSuccessMessage('Newsletter Subscribed Successfully');
                                            resetForm();
                                            } else if(data.status=='fail'){
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
                                        <form onSubmit={handleSubmit}>
                                            <div className="input-group mb-2 search-header-bar">
                                                 <Field name="email">
                                                    {({ field, meta }) => {
                                                        return (
                                                            <>
                                                            <input type="text"  {...field} className="form-control" placeholder="Email" />
                                                            <div onClick={handleSubmit} className="input-group-append">
                                                                <span className="input-group-text"><i className='bx bxs-send'></i></span>
                                                            </div>
                                                            {meta.touched && meta.error && (
                                                                <p className="required">{meta.error}</p>
                                                            )}
                                                            </>
                                                        );
                                                    }}
                                                </Field>
                                            </div>
                                        </form>
                                     )}
                               </Formik>
                               { successMessage && <h6 className="alert alert-success"> { successMessage } </h6> }
                                { errorMessages.map(error => (
                                    <h6 className="alert alert-danger"> { error } </h6>
                                    )) }
                                <p className="land-para">Stay in touch with us </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12">
                            <ul className="social-ul social_icons_footer">
                                <li><a title="Instagram" href="#"><i className='bx bxl-instagram'></i></a> </li>
                                <li><a title="Twitter" href="#"><i className='bx bxl-twitter'></i></a> </li>
                                <li><a title="Facebook" target="blank" href="https://www.facebook.com/LandlordsTalk/"><i className='bx bxl-facebook'></i></a> </li>
                                <li><a title="Google Plus" href="#"><i className='bx bxl-google-plus-circle'></i></a> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="copy-div">
                                <img src={footerCopy} className="copy-img"/>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
Footer.propTypes = {};
export default Footer;