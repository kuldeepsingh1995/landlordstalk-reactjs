import React, {Component, useEffect, useState} from "react";
import PropTypes from "prop-types";
import img1 from "../../../assets/images/upload.png";
import img2 from "../../../assets/images/file.png";
import img3 from "../../../assets/images/check.png";
import "./EditProfile.css"
import {Link, useHistory, withRouter} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {createAction, ActionNames} from '../../../services';
import {useDispatch} from "react-redux";
import {createNotification} from "../../../helpers/notifications";
import {BASE_PATH_USERS} from "../../../helpers/UploadDirectory";
import { UserConstants } from "../../../constants/UserConstants";
import { Helmet } from "react-helmet";

const EditProfile = () => {
    const history = useHistory();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState('');
    const [isImage, setIsImage] = useState(false);
    const [userData, setUserData] = useState('');
    const [passwordHide, SetPasswordHide] = useState(true);
    const [confirmPasswordHide, SetConfirmPasswordHide] = useState(true);
  
    function formatBytes(bytes, decimals = 0) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    useEffect(() => {
        const user_obj = JSON.parse(localStorage.getItem('llt_user_obj'));


        setUserData(user_obj)
    }, [])
    console.log(userData, 'userData')

    const dragOver = (e) => {

        if(e.target.closest(".drop-zone") || e.target.classList.contains(".drop-zone")){
            var target=e.target.closest(".drop-zone")
            if(e.target.classList.contains(".drop-zone")){
                target=e.target.classList.contains(".drop-zone")
            }
            target.classList.add("dropover-div")
        }
        e.preventDefault();
    }

    const dragEnter = (e) => {

        e.preventDefault();
    }

    const dragLeave = (e) => {
        if(e.target.closest(".drop-zone") || e.target.classList.contains(".drop-zone")){
            var target=e.target.closest(".drop-zone")
            if(e.target.classList.contains(".drop-zone")){
                target=e.target.classList.contains(".drop-zone")
            }
            target.classList.remove("dropover-div")
        }
        e.preventDefault();
    }
    function removeImg(){
        setIsImage(false);
        setSelectedFile('');
        if(document.getElementById("uploadedImage")){
            document.getElementById("uploadedImage").style.display = "none";
        }
        document.getElementById("output_image_container").style.display = "none";
      }
    const fileDrop = (e) => {

        e.preventDefault();
        if(e.target.closest(".drop-zone") || e.target.classList.contains(".drop-zone")){
            var target=e.target.closest(".drop-zone")
            if(e.target.classList.contains(".drop-zone")){
                target=e.target.classList.contains(".drop-zone")
            }
            target.classList.remove("dropover-div")
        }
        const files = e.dataTransfer.files;
        if (files.length > 0) {

            if (files[0] != '') {
                if (files[0].type == 'image/png' || files[0].type == 'image/jpg' || files[0].type == 'image/jpeg') {
                    setIsImage(true);
                    setSelectedFile(files[0]);
                    var image = document.getElementById('output_image');
                    image.src = URL.createObjectURL(files[0]);
                    document.getElementById('output_image_container').style.display = 'block';
                    if(document.getElementById('uploadedImage')){
                        document.getElementById('uploadedImage').style.display = 'none';
                    }

                    document.getElementById('output_image_name').innerHTML = files[0].name;
                    document.getElementById('output_image_size').innerHTML = formatBytes(files[0].size, 0);
                    
                } else {
                    createNotification('warning', 'Allowd attachment types are: png, jpg, jpeg')
                    return false;
                }
            }


            
        }
    }
    return (
        <>
                <Helmet>
                    <title>Edit Profile | Landlordstalk</title>
                    <meta name="description" content="Edit Profile | Landlordstalk" />
                </Helmet>
            {
                (userData != '') &&
                <section className="main-header-banner edit-profile-banner">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-md-12 col-xl-7 col-xs-12 col-sm-12">
                                <h1 className="main-h1">Edit Profile</h1>
                                <Formik
                                    initialValues={{
                                        fname: userData.fname,
                                        lname: userData.lname,
                                        username: userData.username,
                                        email: userData.email,
                                       
                                    }}
                                    validationSchema={Yup.object().shape({
                                        fname: Yup.string().required("First Name is Required").test('alphabets', "First Name must only contain alphabets", (value) => {
                                            return /^[A-Za-z?=.*[!@#\$%\^&\*]+$/.test(value);
                                          }),
                                        lname: Yup.string().required("Last Name is Required").test('alphabets', "Last Name must only contain alphabets", (value) => {
                                            return /^[A-Za-z?=.*[!@#\$%\^&\*]+$/.test(value);
                                          }),
                                        username: Yup.string().required("Username is Required"),
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
                                        // if (values.password != values.c_password) {
                                        //     errors.password = "Password and confirm password should same."
                                        // }

                                        return errors;
                                    }}
                                    onSubmit={async (values, {setSubmitting}) => {

                                        if (!isImage) {
                                            // createNotification('warning', 'Image is required')
                                            // return false;
                                        } else {
                                            if (selectedFile != '') {
                                                if (selectedFile.type == 'image/png' || selectedFile.type == 'image/jpg' || selectedFile.type == 'image/jpeg') {
                                                    values.profile_photo = selectedFile;
                                                } else {
                                                    createNotification('warning', 'Allowd attachment types are: png, jpg, jpeg')
                                                    return false;
                                                }
                                            }

                                        }

                                        try {
                                            values.id = userData.landlord_id;
                                            const result = await createAction(ActionNames.ADMIN_USER_UPDATE, {
                                                ...values
                                            });
                                            result.payload.then(res => {
                                                console.log(res, 'res');
                                                const data = res.data;
                                                if (data.status == 'success') {
                                                    createNotification('success',data.message)
                                                    setUserData(data.data)
                                                    localStorage.setItem('llt_user_obj', JSON.stringify(data.data));
                                                    // setTimeout(() => {
                                                    //     this.props.history.push('/user/login');
                                                    // }, 500);
                                                    dispatch({
                                                        type: UserConstants.UPDATE_USER,
                                                        payload: {
                                                            user_obj: data.data,
                                                        }
                                                    })
                                                    document.getElementById('output_image_container').style.display = 'none';

                                                } else if (data.status == 'fail') {
                                                    data.errors.map(error => {
                                                        createNotification('warning', error)
                                                    })
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
                                        <form onSubmit={handleSubmit} className="loginForm" id="loginFomr">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="drop-div" onDragOver={dragOver}
                                                         onDragEnter={dragEnter}
                                                         onDragLeave={dragLeave}
                                                         onDrop={fileDrop}>
                                                        <div className="drop-zone">
                                                            <img src={img1}/>
                                                            <span
                                                                className="drop-zone__prompt">Drag and drop file here</span>
                                                            <p className="or-drop">or</p>
                                                            <button onClick={() => {
                                                                document.getElementById('file_input').click()
                                                            }} type="button" className="upload-btn">Browse files
                                                            </button>
                                                            <input type="file"
                                                                   id="file_input"
                                                                   onChange={(event) => {
                                                                    if (event.target.files[0] != '') {
                                                                        if (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpg' || event.target.files[0].type == 'image/jpeg') {
                                                                            if (event.target.value) {
                                                                                setIsImage(true);
                                                                            }
                                                                            setSelectedFile(event.target.files[0]);
                                                                            var image = document.getElementById('output_image');
                                                                            image.src = URL.createObjectURL(event.target.files[0]);
                                                                            if(document.getElementById('uploadedImage')){
                                                                                document.getElementById('uploadedImage').style.display = 'none';
                                                                            }

                                                                            document.getElementById('output_image_container').style.display = 'block';
                                                                            document.getElementById('output_image_name').innerHTML = event.target.files[0].name;
                                                                            document.getElementById('output_image_size').innerHTML = formatBytes(event.target.files[0].size, 0);

                                                                        }else{
                                                                            createNotification('warning', 'Allowd attachment types are: png, jpg, jpeg')
                                                                        }
                                                                        event.target.value = null;
                                                                    }
                                                                        
                                                                   }}
                                                                   name="myFile" className="drop-zone__input"/>
                                                        </div>
                                                        {
                                                            <div className="drop-file-list" id="output_image_container">
                                                                <div className="file-item">
                                                                    <img src id="output_image" style={{maxWidth: '69px'}}/>
                                                                    <div className="file-detail">
                                                                        <p className="file-name" id="output_image_name"></p>
                                                                        <p className="file-size" id="output_image_size"></p>
                                                                        <img src={img3} className="check-file"/>
                                                                        <i onClick={() => {
                                                                            if(window.confirm('are you sure you want remove it?') === true){
                                                                                removeImg()
                                                                            }
                                                                        }} class='bx bx-minus-circle delete_review_icon'></i>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        }
                                                        {
                                                            (userData.profile_photo != null) &&
                                                            <div className="drop-file-list" id="uploadedImage">
                                                                <div className="file-item">
                                                                    <img src={userData.profile_photo!=null ? BASE_PATH_USERS + userData.profile_photo : ''} style={{maxWidth: '69px'}}/>
                                                                    <div className="file-detail">
                                                                        <p className="file-name">{userData.profile_photo_name}</p>
                                                                        <p className="file-size">{formatBytes(userData.profile_photo_size)}</p>
                                                                        <img src={img3} className="check-file"/>
                                                                        <i onClick={() => {
                                                                            if(window.confirm('are you sure you want remove it?') === true){
                                                                                removeImg()
                                                                            }
                                                                        }} class='bx bx-minus-circle delete_review_icon'></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }
                                                        <p class="custom-notice-error">Accepted document types png, jpg, jpeg.</p> 

                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Last Name <span class="req-span">*</span></label>

                                                        <Field name="lname">
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
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="email">First Name <span class="req-span">*</span></label>
                                                        <Field name="fname">
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
                                                </div>
                                               
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Username <span class="req-span">*</span></label>
                                                        <div className="input-group mb-3">
                                                            <div className="input-group-prepend">
                                                            <span className="input-group-text">
                                                                landlordtalks.com/
                                </span>
                                                            </div>
                                                            <Field name="username">
                                                                {({field, meta}) => {
                                                                    return (
                                                                        <>
                                                                            <div className="container-text"
                                                                                 style={{width: "75%"}}>
                                                                                <input
                                                                                    readOnly="true"
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
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="email">Email Address <span class="req-span">*</span></label>

                                                        <Field name="email">
                                                            {({field, meta}) => {
                                                                return (
                                                                    <div className="container-text">
                                                                        <input
                                                                            readOnly="true"
                                                                            type="email"
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
                                                </div>
                                            </div>
                                              

                                            <div className="row">
                                                <div className="col-md-12 text-center">
                                                    <button
                                                        type="submit"
                                                        onSubmit={handleSubmit}
                                                        disabled={isSubmitting}
                                                        className="btn btn-primary loginFormBtn"
                                                    >
                                                        UPDATE
                                                    </button>
                                                </div>
                                                 
                                            </div>

                                        </form>
                                    )}
                                </Formik>
                                <Formik
                                    initialValues={{
                                        password: "",
                                        c_password: "",
                                    }}
                                    validationSchema={Yup.object().shape({
                                        password: Yup.string().required("Password is Required").matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                                      ),
                                        c_password: Yup.string().required("Confirm Password is Required").test('passwords-match', 'Password and confirm password should same !',  function (value) {
                                            return this.parent.password === value;
                                          })
                                          .matches(
                                            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                                          ),
                                    })}
                                    validate={(values) => {
                                        const errors = {};
                                        

                                        return errors;
                                    }}
                                    onSubmit={async (values, {setSubmitting, resetForm}) => {

                                        

                                        try {
                                            values.id = userData.landlord_id;
                                            const result = await createAction(ActionNames.ADMIN_USER_UPDATE, {
                                                ...values
                                            });
                                            result.payload.then(res => {
                                                console.log(res, 'res');
                                                const data = res.data;
                                                if (data.status == 'success') {
                                                    createNotification('success', 'Password changed successfully')
                                                    setUserData(data.data)
                                                    // localStorage.setItem('llt_user_obj', JSON.stringify(data.data));
                                                    resetForm()
                                                } else if (data.status == 'fail') {
                                                    data.errors.map(error => {
                                                        createNotification('warning', error)
                                                    })

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
                                        <form onSubmit={handleSubmit} className="loginForm" id="loginFomr">
                                             
                                            <h1 className="main-h1">Change Password</h1>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="pwd">Password <span class="req-span">*</span></label>

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
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="cpwd">Confirm Password <span class="req-span">*</span></label>

                                                        <div className="container-text">
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

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12 text-center">
                                                    <button
                                                        type="submit"
                                                        onSubmit={handleSubmit}
                                                        disabled={isSubmitting}
                                                        className="btn btn-primary loginFormBtn"
                                                    >
                                                        CHANGE PASSWORD
                                                    </button>
                                                </div>
                                                 
                                            </div>

                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </section>
            }

        </>
    );
}


EditProfile.propTypes = {};

export default withRouter(EditProfile);
