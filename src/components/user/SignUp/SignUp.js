import React, { Component } from "react";
import PropTypes from "prop-types";
import img1 from "../../../assets/images/1.PNG";
import img2 from "../../../assets/images/2.PNG";
import img3 from "../../../assets/images/3.PNG";
import img4 from "../../../assets/images/4.PNG";
import img5 from "../../../assets/images/5.PNG";
import google from "../../../assets/images/google-icon.png";
import facebook from "../../../assets/images/Facebook Logo.png";
import { Link, withRouter } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { createAction, ActionNames } from "../../../services";
import ReadyToReview from "../ReadyToReview";
import SocialMediaLogin from "../SocialMediaLogin";
import Modal from "react-modal";
import TermsContent from "../TermsContent";
import { createNotification } from "../../../helpers/notifications";
import { Helmet } from "react-helmet";

class SignUp extends Component {
  state = {
    username: '',
    is_checked: false,
    confirmPasswordHide: true,
    passwordHide: true,
    successMessage: "",
    errorMessages: [],
    modalData: {
      show: false,
    },
  };

  openModal = () => {
    this.setState({
      modalData: {
        show: true,
      },
    });
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  };

  closeModal = () => {
    this.setState({
      modalData: {
        show: false,
      },
    });
  };

  render() {
    const modalStyles = {
      background: "black",
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        padding: "0",
        overflow: "scroll",
        height: "75%",
        width: "40%",
      },
    };
    return (
      <div className="sign-up-page"  id="signup-page-form">
        <Helmet>
            <title>Signup | Landlordstalk</title>
            <meta name="description" content="Signup | Landlordstalk" />
        </Helmet>
        {this.state.modalData.show && (
          <Modal
            isOpen={this.state.modalData.show}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={modalStyles}
            contentLabel="Example Modal"
          >
            <div className="r-modal-header">
              <p className="r-heading">Terms Of Use & Privacy Policy</p>
              <button className="r-close" onClick={this.closeModal}>
                <i className="bx bx-x"></i>
              </button>
            </div>
            <div className="container r-modal-body">
              <TermsContent />
            </div>
          </Modal>
        )}
        <section className="main-header-banner">
          <div className="container">
            <div className="row d-flex justify-content-center text-center">
              <div className="col-md-12 col-xl-7 col-xs-12 col-sm-12">
                <h1 className="main-h1">Sign Up</h1>
                <Formik
                  initialValues={{
                    fname: "",
                    lname: "",
                    username: "",
                    email: "",
                    password: "",
                    c_password: "",
                    is_agree_terms: false,
                  }}
                  enableReinitialize
                  validationSchema={Yup.object().shape({
                    is_agree_terms: Yup.bool().oneOf([true], 'Accept Terms Of Use & Privacy Policy is required'),
                    fname: Yup.string().required("First Name is Required").test('alphabets', 'First Name must only contain alphabets', (value) => {
                      return /^[A-Za-z?=.*[!@#\$%\^&\s\*]+$/.test(value);
                    }),
                    lname: Yup.string().required("Last Name is Required").test('alphabets', 'Last Name must only contain alphabets', (value) => {
                      return /^[A-Za-z?=.*[!@#\$%\^&\s\*]+$/.test(value);
                    }),
                    username: Yup.string().required("Username is Required"),
                    email: Yup.string().required("Email is Required"),
                    password: Yup.string()
                      .required("Password is Required")
                      .matches(
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                      ),
                    c_password: Yup.string()
                      .required("Confirm Password is Required")
                      .test(
                        "passwords-match",
                        "Password and confirm password should same !",
                        function (value) {
                          return this.parent.password === value;
                        }
                      )
                      .matches(
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                      ),
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
                    //   errors.password =
                    //     "Password and confirm password should same.";
                    // }
                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                      const result = await createAction(
                        ActionNames.REGISTER_LANDLORD,
                        {
                          ...values,
                        }
                      );
                      result.payload.then((res) => {
                        console.log(res, "res");
                        const data = res.data;
                        if (data.status == "success") {
                          resetForm()
                          // this.setState({ errorMessages: []});
                          // this.setState({ successMessage: data.message});
                          // setTimeout(() => {
                            // this.setState({ successMessage: ''});
                          this.setState({ username: '' });

                            this.props.history.push('/user/signup-confirmation/'+data.data.landlord_id);
                          // }, 5000);
                        } else if (data.status == "fail") {
                          this.setState({ successMessage: '' });
                          this.setState({ errorMessages: data.errors });
                        }
                      });
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
                    resetForm,
                    setFieldValue
                    /* and other goodies */
                  }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="loginForm"
                      id="loginFomr"
                    >
                      <div className="row">
                        
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="email">Last Name</label>
                            <Field name="lname">
                              {({ field, meta }) => {
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
                            <label htmlFor="email">First Name</label>
                            <Field name="fname">
                              {({ field, meta }) => {
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
                            <label htmlFor="email">Username</label>
                            <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  landlordtalks.com/
                                </span>
                              </div>
                              <Field name="username">
                                {({ field, meta }) => {
                                  return (
                                    <>
                                      <div
                                        className="container-text"
                                        style={{ width: "75%" }}
                                      >
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={this.state.username}
                                          onKeyPress={(e) => {
                                              var x = e.which || e.keyCode;
                                              if(x==32){
                                                  createNotification('warning', 'space are not allowed')
                                              }
                                          }}
                                          onChange={(e) => {
                                              
                                              this.setState({username: e.target.value.replace(/\s/g, '')});
                                              // handleChange(e)
                                              setFieldValue('username', e.target.value.replace(/\s/g, ''))
                                              // values.username = this.state.username;
                                              console.log(values)
                                          }}
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
                            <label htmlFor="email">Email Address</label>
                            <Field name="email">
                              {({ field, meta }) => {
                                return (
                                  <div className="container-text">
                                    <input
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
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="pwd">Password</label>
                            <Field name="password">
                              {({ field, meta }) => {
                                return (
                                  <div className="container-text">
                                    <div class="input-group">
                                      <input
                                        type={
                                          this.state.passwordHide == true
                                            ? "password"
                                            : "text"
                                        }
                                        style={{ border: "none" }}
                                        className="form-control"
                                        {...field}
                                      />
                                      <div class="input-group-prepend">
                                        <span
                                          class="input-group-text password_show_hide_icons"
                                          id="validationTooltipUsernamePrepend"
                                        >
                                          {this.state.passwordHide === true ? (
                                            <i
                                              class="bx bxs-show"
                                              onClick={() =>
                                                this.setState({
                                                  passwordHide: false,
                                                })
                                              }
                                            ></i>
                                          ) : (
                                            <i
                                              class="bx bxs-hide"
                                              onClick={() =>
                                                this.setState({
                                                  passwordHide: true,
                                                })
                                              }
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
                            <i class="fa fa-eye"></i>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="cpwd">Confirm Password</label>
                            <Field name="c_password">
                              {({ field, meta }) => {
                                return (
                                  <div className="container-text">
                                    <div class="input-group">
                                      <input
                                        type={
                                          this.state.confirmPasswordHide == true
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
                                          {this.state.confirmPasswordHide ===
                                          true ? (
                                            <i
                                              class="bx bxs-show"
                                              onClick={() =>
                                                this.setState({
                                                  confirmPasswordHide: false,
                                                })
                                              }
                                            ></i>
                                          ) : (
                                            <i
                                              class="bx bxs-hide"
                                              onClick={() =>
                                                this.setState({
                                                  confirmPasswordHide: true,
                                                })
                                              }
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
                      <div className="form-group form-check">
                        <div className="row">
                          <div className="col-md-12">
                            <Field name="is_agree_terms">
                              {({ field, meta }) => {
                                return (
                                  <>
                                    <label className="form-check-label accept-input">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        {...field}
                                      />
                                      {" "}
                                      I accept the {" "}
                                    </label>
                                    <a
                                        style={{color: '#059a9b'}}
                                        onClick={(e) => {
                                          this.openModal();
                                        }}
                                    >Terms of Use <span>&</span> Privacy Policy
                                      </a>
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
                      {this.state.successMessage && (
                        <span>
                          <h3 className="alert alert-success">
                            {" "}
                            {this.state.successMessage}{" "}
                          </h3>
                          <h3 className="alert alert-warning">
                            Verify your email after click on email account for
                            login
                          </h3>
                        </span>
                      )}
                      {this.state.errorMessages.map((error) => (
                        <h3 className="alert alert-danger"> {error} </h3>
                      ))}
                      <div className="row">
                        <div className="col-md-6">
                          <button
                            onSubmit={handleSubmit}
                            disabled={isSubmitting}
                            type="submit"
                            className="btn btn-primary loginFormBtn"
                          >
                            SIGN UP
                          </button>
                        </div>
                        <div className="col-md-6">
                          <button
                            onClick={()=> {
                              if(window.confirm('Are you sure you want to clear the form ?')){
                                resetForm()
                              }
                            }}
                            type="reset"
                            className="btn btn-primary clear-form-btn"
                          >
                            CLEAR FORM
                          </button>
                        </div>
                      </div>
                      <div className="otherLoginOptions">
                        <p>Or sign up with</p>
                        <SocialMediaLogin></SocialMediaLogin>
                        <p>Have an account?</p>
                        <Link to="/user/login" className="signup-btn">
                          LOG IN NOW
                        </Link>
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
                <h3 className="section-h3">
                  How It <span>Works</span>
                </h3>
                <div className="how">
                  <div className="howItem">
                    <img src={img1} />
                    <div className="howInfo">
                      <h3>sign up</h3>
                      <p>Create your account</p>
                    </div>
                  </div>
                  <div className="howItem">
                    <img src={img2} />
                    <div className="howInfo">
                      <h3>Review</h3>
                      <p>
                        Fill a form to review
                        <br />
                        your tentant
                      </p>
                    </div>
                  </div>
                  <div className="howItem">
                    <img src={img3} />
                    <div className="howInfo">
                      <h3>share</h3>
                      <p>
                        Share it with other
                        <br />
                        landlords
                      </p>
                    </div>
                  </div>
                  <div className="howItem">
                    <img src={img4} />
                    <div className="howInfo">
                      <h3>search</h3>
                      <p>
                        Search for a tentant
                        <br />
                        review
                      </p>
                    </div>
                  </div>
                  <div className="howItem">
                    <img src={img5} />
                    <div className="howInfo">
                      <h3>find</h3>
                      <p>
                        Find reviews for your
                        <br />
                        desired tentant
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ReadyToReview></ReadyToReview>
      </div>
    );
  }
}

SignUp.propTypes = {};

export default withRouter(SignUp);
