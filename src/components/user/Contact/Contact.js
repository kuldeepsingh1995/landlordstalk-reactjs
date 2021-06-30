import React, { useCallback, useEffect, Component, useState } from "react";
import PropTypes from 'prop-types';
import img1 from "../../../assets/images/1.PNG"
import img2 from "../../../assets/images/2.PNG"
import img3 from "../../../assets/images/3.PNG"
import img4 from "../../../assets/images/4.PNG"
import img5 from "../../../assets/images/5.PNG"
import logoLight from "../../../assets/images/logo-light.png"
import './Contact.css';
import ReadyToReview from '../ReadyToReview';
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import{ createAction, ActionNames } from '../../../services';
import { Helmet } from "react-helmet";
const Contact = (props) => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
         return (
            <>
            <Helmet>
                    <title>Contact Us | Landlordstalk</title>
                    <meta name="description" content="Contact Us | Landlordstalk" />
                </Helmet>
                <section className="doesSection contactSection">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-12 col-xl-8 col-xs-12 col-sm-12">
                                <h3 className="does-h"><span>Contact</span> Us</h3>
                                <img className="sec-logo-img-2" src={logoLight} />
                                { successMessage && <h3 className="alert alert-success"> { successMessage } </h3> }
                                { errorMessages.map(error => (
                                    <h3 className="alert alert-danger"> { error } </h3>
                                    )) }
                                <Formik
                                    initialValues={{
                                        first_name: "",
                                        last_name: "",
                                        email: "",
                                        message: "",
                                     }}
                                    validationSchema={Yup.object().shape({
                                        first_name: Yup.string().required("First Name is Required").test('alphabets', 'First Name must only contain alphabets', (value) => {
                                            return /^[A-Za-z?=.*[!@#\$%\^&\*]+$/.test(value);
                                        }),
                                        last_name: Yup.string().required("Last Name is Required").test('alphabets', 'Last Name must only contain alphabets', (value) => {
                                            return /^[A-Za-z?=.*[!@#\$%\^&\*]+$/.test(value);
                                        }),
                                        email: Yup.string().required("Email is Required"),
                                        message: Yup.string().required("Message is Required"),
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
                                    onSubmit={async (values, { setSubmitting,resetForm }) => {
                                        setSuccessMessage('Contact Request Submitted Successfully');
                                       resetForm();
                                        try {
                                        const result= await createAction(ActionNames.USER_CONTACT, {
                                            ...values
                                        });
                                        result.payload.then(res => {
                                            const data = res.data;
                                            if(data.status=='success'){
                                            setSuccessMessage('Contact Request Submitted Successfully');
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
                                        resetForm
                                        /* and other goodies */
                                    }) => (
                                <form onSubmit={handleSubmit} className="loginForm">
                                    <div className="row">
                                        
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="email">Last Name <span class="req-span">*</span></label>
                                                <Field name="last_name">
                                                    {({ field, meta }) => {
                                                        return (
                                                            <>
                                                            <input type="text"  {...field} className="form-control" placeholder="" />
                                                            {meta.touched && meta.error && (
                                                                <p className="required">{meta.error}</p>
                                                            )}
                                                            </>
                                                        );
                                                    }}
                                                </Field>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="email">First Name <span class="req-span">*</span></label>
                                                <Field name="first_name">
                                                    {({ field, meta }) => {
                                                        return (
                                                            <>
                                                            <input type="text"  {...field} className="form-control" placeholder="" />
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
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="email">Email Address <span class="req-span">*</span></label>
                                                 <Field name="email">
                                                    {({ field, meta }) => {
                                                        return (
                                                            <>
                                                            <input type="text"  {...field} className="form-control" placeholder="" />
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
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label htmlFor="pwd">Message <span class="req-span">*</span></label>
                                                <Field name="message">
                                                    {({ field, meta }) => {
                                                        return (
                                                            <>
                                                           <textarea className="form-control" {...field}  placeholder="" id="pwd" rows={5}></textarea>
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
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button type="submit" className="btn btn-primary loginFormBtn bg-full">SEND MESSAGE</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button type="reset"onClick={() => {
                                                if(window.confirm('Are you sure ?')===true){
                                                    resetForm()
                                                }
                                            }} className="btn btn-primary clear-form-btn bg-full">CLEAR FORM</button>
                                        </div>
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
Contact.propTypes = {};
export default Contact;