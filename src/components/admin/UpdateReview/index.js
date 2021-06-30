import { React, Component, useState, useCallback, useEffect } from "react";
import user from "../../../assets/images/avatar.png";
import user2 from "../../../assets/images/r.png";
import { ActionNames, createAction } from "../../../services";
import ReactPaginate from "react-paginate";
import { createNotification } from "../../../helpers/notifications";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router";
const UpdateReview = (props) => {
  // const [selectedAnswers, setSelectedAnswers] = useState([]);
  // const [QuestionList, setQuestData] = useState([]);
  // const [selectedRateValue, setRateValue] = useState({});
  // const starList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const [data, setData] = useState([]);

  // const [successMessage, setSuccessMessage] = useState("");
  // const [errorMessages, setErrorMessages] = useState([]);
  // let { id } = useParams();  
  // function setCheckbox(ques_id, val) {
  //   setSelectedAnswers((prevAnswers) => {
  //     const index = prevAnswers.findIndex((item) => item.ques_id === ques_id);
  //     if (index === -1) {
  //       return prevAnswers.concat({
  //         ques_id,
  //         ans: val,
  //       });
  //     }

  //     const prevAnswersCopied = [...prevAnswers];
  //     prevAnswersCopied[index] = {
  //       ...prevAnswersCopied[index],
  //       ans: val,
  //     };

  //     return prevAnswersCopied;
  //   });
  // }

  // const searchData = useCallback(async () => {
  //   try {
  //     const search = {review_id: id};
  //     const fetching = createAction(ActionNames.ADMIN_REVIEW_GET, search);
  //     const resp_data = fetching.payload;
  //     resp_data.then((resp) => {
  //        setData(resp.data.data);
  //        setQuestData(resp.data.data.data);
  //        console.log(resp.data.data.ques_list)
  //       setSelectedAnswers(resp.data.data.ques_list)
  //       resp.data.data.ques_list.map(ques => {
  //         setRateValue(prev => ({
  //           ...prev,
  //           [ques.ques_id]: ques.rating,
  //         })
  //         )
  //       })
        
  //       // setRateValue(resp.data.data.ques_list)
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // });
  // const getQues = useCallback(async () => {
  //   try {
  //     const data = createAction(ActionNames.QUESTION_LIST);
  //     const data1 = await data.payload;
  //     setQuestData(data1.data.data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

    // useEffect(() => {
    //   searchData();
    //   // getQues();
    // }, []);

  // console.log(selectedAnswers, 'selectedAnswers')
  return (
    <>
      {/* <div className="admin-card">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="admin-card-header user-manager-header">
                <h1>Update Review</h1>
              </div>
            </div>
          </div>

          {(data) && (
            
            <div className="row">
              {console.log(data.tenant?.tenant_fname, 'data')}
              <div className="col-md-12">
                <Formik
                  initialValues={{
                    tenant_fname: data.tenant?.tenant_fname,
                    tenant_lname: data.tenant?.tenant_lname,
                    tenant_dob: data.tenant?.tenant_dob,
                    address:  data.address,
                    state: data.state,
                    city: data.city,
                    lease_start_date: data.lease_start_date,
                    lease_end_date: data.lease_end_date,
                    comment: data.comment,
                  }}
                  enableReinitialize
                  validationSchema={Yup.object().shape({
                    tenant_fname: Yup.string().required(
                      "Tenant's First Name is Required"
                    ),
                    tenant_lname: Yup.string().required(
                      "Tenant's Last Name is Required"
                    ),
                    tenant_dob: Yup.string().required(
                      "Tenant's Date of Birth is Required"
                    ),
                    address: Yup.string().required(
                      "Property Street Address is Required"
                    ),
                    state: Yup.string().required("Property State is Required"),
                    city: Yup.string().required("Property City is Required"),
                    lease_start_date: Yup.string().required(
                      "Lease Start Date is Required"
                    ),
                    lease_end_date: Yup.string().required(
                      "Lease End Date is Required"
                    ),
                    comment: Yup.string().required(
                      "Additional Information is Required"
                    ),
                  })}
                  validate={(values) => {
                    const errors = {};

                    return errors;
                  }}
                  onSubmit={async (values, { setSubmitting, resetForm }) => {
                    try {
                      
                      
                      console.log(values, "values");
                      if (selectedAnswers.length != QuestionList.length) {
                        setErrorMessages(["All Rating question are required."]);
                        return false;
                      }
                      values.review_id =data.review_id;
                      values.tenant_id = data.tenant_id;
                      values.ques_list = selectedAnswers.map((ans) => ({
                        ...ans,
                        rating: selectedRateValue[ans.ques_id],
                      }));

                      const result = await createAction(
                        ActionNames.ADMIN_REVIEW_UPDATE,
                        {
                          ...values,
                        }
                      );
                      result.payload.then((res) => {
                        console.log(res, "res");
                        const data = res.data;
                        if (data.status == "success") {
                          setSuccessMessage(data.message);
                          setSelectedAnswers([]);
                          setRateValue({});
                          resetForm();
                        } else if (data.status == "fail") {
                          setErrorMessages(data.errors);
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
                    
                  }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="loginForm"
                      id="loginFomr"
                    >
                      <p className="main-form-heading">Tenant Details</p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="email">Tenant's First Name</label>
                            <Field name="tenant_fname">
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
                            <label htmlFor="email">Tenant's Last Name</label>

                            <Field name="tenant_lname">
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
                            <label htmlFor="email">
                              Tenant's Date of Birth
                            </label>

                            <Field name="tenant_dob">
                              {({ field, meta }) => {
                                return (
                                  <div className="container-text">
                                    <input
                                      type="date"
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
                      <p className="main-form-heading">Property Details</p>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="email">
                              Property Street Address
                            </label>

                            <Field name="address">
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
                            <label htmlFor="email">Property City</label>
                            <Field name="city">
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
                            <label htmlFor="email">Property State</label>
                            <Field name="state">
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

                      <p className="main-form-heading">Length of Lease</p>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="email">Lease Start Date</label>
                            <Field name="lease_start_date">
                              {({ field, meta }) => {
                                return (
                                  <div className="container-text">
                                    <input
                                      type="date"
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
                            <label htmlFor="email">Lease End Date</label>
                            <Field name="lease_end_date">
                              {({ field, meta }) => {
                                return (
                                  <div className="container-text">
                                    <input
                                      type="date"
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
                      {console.log(selectedAnswers, "ssllsl")}
                      <p className="main-form-heading">Tenant Ratings</p>
                      <div className="row">
                        <div className="col-md-12">
                          {(selectedAnswers.length >0) &&

                          QuestionList.map((item, index) => (
                            <div className="form-group" key={item.ques_id}>
                              <label className="main-label">
                                {index + 1}. {item.ques}
                              </label>
                              <label className="option-label">
                                <input
                                  onChange={() => {
                                    setCheckbox(item.ques_id, "yes");
                                  }}
                                  checked={
                                    selectedAnswers.find(
                                      (selectedAns) =>
                                        selectedAns.ques_id === item.ques_id
                                    )?.ans === "yes"
                                  }
                                  // checked={props.selectedAnswers[index] === 'yes' ? true : false}
                                  type="radio"
                                  name={item.ques_id}
                                  className="form-control"
                                  placeholder=""
                                />
                                Yes
                              </label>
                              <label className="option-label">
                                <input
                                  type="radio"
                                  className="form-control"
                                  placeholder=""
                                  name={item.ques_id}
                                  checked={
                                    selectedAnswers.find(
                                      (selectedAns) =>
                                        selectedAns.ques_id === item.ques_id
                                    )?.ans === "no"
                                  }
                                  onChange={() => {
                                    setCheckbox(item.ques_id, "no");
                                  }}
                                />
                                No
                              </label>
                              {console.log(
                                selectedRateValue,
                                "selectedRateValue"
                              )}
                              <div className="rating-div">
                                <p>Rating:</p>
                                <div
                                  className="rating"
                                  className={
                                    "rate-" + selectedRateValue[item.ques_id]
                                  }
                                >
                                  {starList.map((star) => {
                                    return (
                                      <label key={star}>
                                        <input
                                          type="radio"
                                          value={star}
                                         
                                          onClick={() =>
                                            setRateValue((prev) => ({
                                              ...prev,
                                              [item.ques_id]: star,
                                            }))
                                          }
                                        />{" "}
                                        ★
                                      </label>
                                    );
                                  })}
                                </div>
                              
                              </div>
                            </div>
                          ))
                            }
                        </div>
                      </div>

                      <p className="main-form-heading">
                        Additional Information
                      </p>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="email">
                              Any other comments that other landlords should
                              know about this tenant? ( 255 words limit)
                            </label>

                            <Field name="comment">
                              {({ field, meta }) => {
                                return (
                                  <div className="container-text">
                                    <textarea
                                      className="form-control"
                                      rows="6"
                                      {...field}
                                    ></textarea>

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
                      <div className="row s-row">
                        {console.log(isSubmitting, "isSubmitting")}
                        <div className="col-md-12">
                          <button
                            onSubmit={handleSubmit}
                            disabled={isSubmitting}
                            type="submit"
                            className="btn btn-primary"
                          >
                            SUBMIT REVIEW
                          </button>
                           
                        </div>
                      </div>
                      {successMessage && (
                        <div className="row" style={{ "margin-top": "10px" }}>
                          <div className="col-md-12">
                            <h3 className="alert alert-success">
                              {" "}
                              {successMessage}{" "}
                            </h3>
                          </div>
                        </div>
                      )}
                      {errorMessages.map((error) => (
                        <div className="row" style={{ "margin-top": "10px" }}>
                          <div className="col-md-12">
                            <h3 className="alert alert-danger"> {error} </h3>
                          </div>
                        </div>
                      ))}
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          )}
        </div>
      </div>
   */}
    </> 
  );
};

export default UpdateReview;
