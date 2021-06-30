import React, {Component, useCallback, useState} from 'react';
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
import {
    LoginSocialGoogle,
    LoginSocialFacebook
   } from "reactjs-social-login";
   
const SocialMediaLogin = () => {
  
    const history = useHistory();  
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const dispatch = useDispatch();
    const doLogin = useCallback(async (PostData) => {
        try {
            const result =  await createAction(ActionNames.SOCIAL_LOGIN, PostData);
            result.payload.then(res => {
                const data = res.data;
                if (data.status == 'success') {
                    setSuccessMessage(data.message);
                    localStorage.setItem('llt_user', data.token);
                    localStorage.setItem('llt_user_obj', JSON.stringify(data.user));
                    dispatch({
                        type: UserConstants.LOGIN_SUCCESS,
                        payload: {
                            user: data.token,
                        }
                    })
                    setTimeout(() => {
                        history.push('/user');
                    }, 500);

                } else if (data.status == 'fail') {
                    setErrorMessages(data.errors)
                }
            })
        } catch (e) {
            console.log(e);
        }

    })
    const REDIRECT_URI = "https://developer.d2kb984q3ebg20.amplifyapp.com/user/login/";

    return (
        <>
            <div className="loginOptionDiv" style={{display: 'inline-flex'}}>
                <LoginSocialFacebook
                    fieldsProfile="name, email, birthday, first_name, last_name"
                    appId='2774303075445365467669'
                    onResolve={({ data }) => {
                        console.log(data);
                        const PostData = {
                            fname: data.first_name,
                            lname: data.last_name,
                            email: data.email,
                            facebook_id: data.id,
                            login_type: 'facebook'
                        };
                        doLogin(PostData)
                    }}
                    onReject={(err) => console.log(err)}
                >
                    <button type="button" className="facebook"><img src={facebook}/>facebook</button>
                </LoginSocialFacebook>  
                <LoginSocialGoogle
                    client_id={'110194213217-ou8ht81pe435fdg43fhfghchjf1ki4epip5m7fc6mskj5.apps.googleusercontent.com'}
                    onResolve={({provider, data}) => {
                        console.log(data, provider);
                        const PostData = {
                            fname: data.getBasicProfile().getGivenName(),
                            lname: data.getBasicProfile().getFamilyName(),
                            email: data.getBasicProfile().getEmail(),
                            google_id: data.getBasicProfile().getId(),
                            login_type: 'google'
                        };
                        doLogin(PostData)
                    }}
                    onReject={(err) => console.log(err)}
                >
                    <button type="button" className="google"><img src={google}/>google</button>
                </LoginSocialGoogle>
            </div>
        </>
    );
}

SocialMediaLogin.propTypes = {};

export default withRouter(connect()(SocialMediaLogin));
