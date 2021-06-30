import React, { Component, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import img1 from "../../../assets/images/1.PNG";
import img2 from "../../../assets/images/2.PNG";
import img3 from "../../../assets/images/3.PNG";
import img4 from "../../../assets/images/4.PNG";
import img5 from "../../../assets/images/5.PNG";
import google from "../../../assets/images/google-icon.png";
import facebook from "../../../assets/images/Facebook Logo.png";
import { Link, useParams, withRouter } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { createAction, ActionNames } from "../../../services";
import ReadyToReview from "../ReadyToReview";
import SocialMediaLogin from "../SocialMediaLogin";
import Modal from "react-modal";
import TermsContent from "../TermsContent";
import { Helmet } from "react-helmet";

const SignupConfirmation = () => {
    const {landlord_id} = useParams();
    const sendInitialEmail = useCallback(async () => {
        try {
            const postData = {landlord_id: landlord_id}
            const fetching = createAction(ActionNames.SEND_INITIAL_EMAIL, postData);
            const resp_data = fetching.payload;
            resp_data.then((resp) => {

            })
            

        } catch (e) {
            console.log(e);
        }
        });

        useEffect(() => {
            sendInitialEmail()

        }, []);

    return (
        <div className="sign-up-page">
            <Helmet>
                <title>Signup Confirmation | Landlordstalk</title>
                <meta name="description" content="Signup Confirmation | Landlordstalk" />
            </Helmet>
            <section className="">
                <div className="container">
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-md-12 col-xl-7 col-xs-12 col-sm-12">
                    <h1 className="main-h1">Sign Up Confirmation</h1>
                        <div className="alert alert-success">Landlord signup successfully</div>
                        <h3 className="alert alert-warning">Verify your email after click on email account for login</h3>
                        <div  style={{display: 'flex', justifyContent: 'center'}}>
                            <Link style={{width: 'fit-content'}} className="nav-link login-btn" to="/user/login">Login</Link>
                        </div>
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
                </div>
            </section>
        </div>
    );
}

SignupConfirmation.propTypes = {};

export default withRouter(SignupConfirmation);
