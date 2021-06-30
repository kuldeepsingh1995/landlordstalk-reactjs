import React, { useCallback, useEffect, Component, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import img1 from "../../../assets/images/1.PNG";
import img2 from "../../../assets/images/2.PNG";
import img3 from "../../../assets/images/3.PNG";
import img4 from "../../../assets/images/4.PNG";
import img5 from "../../../assets/images/5.PNG";
import user from "../../../assets/images/avatar.png";
import checkfile from "../../../assets/images/check.png";
import TenantSearch from "../../TenantSearch";
import CircularProgressWithLabel from "../../../UIElements/CircularBar/CircularBar";
import "../SearchTenants/searchTenants.css";
import { Link, useHistory, withRouter } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { createAction, ActionNames } from "../../../services";
import { searchNotification } from "../../../helpers/searchNotifications";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createNotification } from "../../../helpers/notifications";
import { BASE_PATH_USERS } from "../../../helpers/UploadDirectory";
import { StatesList } from "../../../helpers/StatesList";

const SearchTenantReviews = (props) => {
  const dispatch = useDispatch();
  const [tenatnDOBNew, setTenatnDOBNew] = useState(new Date());
  const [leaseStartDate, setLeaseStartDate] = useState(new Date());
  const [leaseEndDate, setLeaseEndDate] = useState(new Date());
  const endDateForDOB = new Date();

  const [tenantReviews, seTenantReviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [QuestionList, setQuestData] = useState([]);
  const [Reviews, setReviews] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRateValue, setRateValue] = useState({});
  const [currentPage, setPage] = useState(1);
  const [lastPage, setLastPage] = useState("");
  const [searchStatus, setSearchStatus] = useState(0);
  const [searchParams, setSearchParams] = useState({
    tenant_fname: "",
    tenant_lname: "",
    tenant_dob: "",
    address: "",
    state: "",
    city: "",
  });

  const [selectedFile, setSelectedFile] = useState('');
  const [isImage, setIsImage] = useState(false);
  const StateList = StatesList();
  console.log(StateList, 'StateList')
  const history = useHistory();
  function formatBytes(bytes, decimals = 0) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
  const urlParams = new URLSearchParams(window.location.search);
  const openParam = urlParams.get("open");
  const starList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [darkBg, setDarkBg] = useState(urlParams.get("open") == 1);
  // if(open!=null && open==1){
  //   setDarkBg(true)
  //   console.log('sdfsf')
  // }

  useEffect(() => {
    setDarkBg(urlParams.get("open") == 1);
  }, [openParam]);

  useEffect(() => {
    console.log('useeffect runed')
    // if (isSearchCalled) {
      // searchReviews();
    // }
    if(currentPage!=1){
      searchReviews();
    }
  }, [currentPage]);

  useEffect(() => {}, [darkBg]);
  useEffect(() => {
    // window.scrollTo(0, 0)
  }, []);
  function loadMoreReviews() {
    let newPage = currentPage + 1;
    setPage(newPage);
  }

  const searchReviews = useCallback(async () => {
    try {
      setSearchStatus(1);
      let searchParams_ = { ...searchParams };
      console.log(searchParams_,'searchParams_')
      if(searchParams_.tenant_dob==null){
        searchParams_.tenant_dob = "";
      }
      if (searchParams_.tenant_dob != "") {
        searchParams_.tenant_dob = formatDate_(searchParams_.tenant_dob);
      }
      let search = {
        search: searchText,
        page: currentPage,
        params: searchParams_,
      };
      console.log(search, "search");
      const tenant_look = createAction(
        ActionNames.TENANT_REVIEW_SEARCH,
        search
      );
      const tenant_resp = await tenant_look.payload;
      setReviews((prevReview) => prevReview.concat(tenant_resp.data.data.data));
      
      setLastPage(tenant_resp.data.data.last_page);
      setSearchStatus(2);

    } catch (e) {
      console.log(e);
    }
  });

  function formatDate_(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();

    var dateString =
      y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
    return dateString;
  }
  function setCheckbox(ques_id, val) {
    setSelectedAnswers((prevAnswers) => {
      const index = prevAnswers.findIndex((item) => item.ques_id === ques_id);
      if (index === -1) {
        return prevAnswers.concat({
          ques_id,
          ans: val,
        });
      }

      const prevAnswersCopied = [...prevAnswers];
      prevAnswersCopied[index] = {
        ...prevAnswersCopied[index],
        ans: val,
      };

      return prevAnswersCopied;
    });
  }
  const { isLoggedIn, user_obj } = useSelector((state) => {
    return {
      isLoggedIn: state.authentication.user?.loggedIn,
      user_obj: state.authentication.user?.user_obj,
    };
  });
  function UPLAOD_FILE(file) {

  }
  const getQues = useCallback(async () => {
    try {
      const data = createAction(ActionNames.QUESTION_LIST, {}, false);
      const data1 = await data.payload;
      setQuestData(data1.data.data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const dragOver = (e) => {
    if (
      e.target.closest(".drop-zone") ||
      e.target.classList.contains(".drop-zone")
    ) {
      var target = e.target.closest(".drop-zone");
      if (e.target.classList.contains(".drop-zone")) {
        target = e.target.classList.contains(".drop-zone");
      }
      target.classList.add("dropover-div");
    }
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    if (
      e.target.closest(".drop-zone") ||
      e.target.classList.contains(".drop-zone")
    ) {
      var target = e.target.closest(".drop-zone");
      if (e.target.classList.contains(".drop-zone")) {
        target = e.target.classList.contains(".drop-zone");
      }
      target.classList.remove("dropover-div");
    }
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    if (
      e.target.closest(".drop-zone") ||
      e.target.classList.contains(".drop-zone")
    ) {
      var target = e.target.closest(".drop-zone");
      if (e.target.classList.contains(".drop-zone")) {
        target = e.target.classList.contains(".drop-zone");
      }
      target.classList.remove("dropover-div");
    }
    const files = e.dataTransfer.files;
    if (files.length > 0) {

      if (files[0] != '') {
        console.log(files[0].type, 'files[0].type')
        if (files[0].type == 'image/png' || files[0].type == 'image/jpg' || files[0].type == 'image/jpeg' || files[0].type == 'application/pdf' || files[0].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          setIsImage(true);
          console.log(files[0]);
          setSelectedFile(files[0]);
          var image = document.getElementById("output_image");
          // image.src = URL.createObjectURL(files[0]);
          document.getElementById("output_image_container").style.display = "block";
          document.getElementById("output_image_name").innerHTML = files[0].name;
          document.getElementById("output_image_size").innerHTML = formatBytes(
            files[0].size,
            0
          );
        } else {
            createNotification('warning', 'Allowd attachment types are: png, jpg, jpeg, pdf,docx')
            return false;
        }
    }

    

     
    }
  };
  function removeImg(){
    setIsImage(false);
    setSelectedFile('');
    document.getElementById("output_image_container").style.display = "none";
  }
  useEffect(() => {
    getQues();
  }, []);
  let search;
  
    search = (
      <TenantSearch
        lastPage={lastPage}
        currentPage={currentPage}
        searchStatus={searchStatus}
        loadMoreResults={() => {
          loadMoreReviews();
        }}
        searchText={searchText}
        Reviews={Reviews}
        isLoggedIn={isLoggedIn}
        user={user}
      />
    );
  
  return (
    <>
      <section
        className={[
          "main-header-banner",
          darkBg ? "" : "search-tenants-banner",
        ].join(" ")}
      >
        <div className="container">
          <div className="row d-flex justify-content-center text-center">
            <div className="col-lg-7 col-md-10">
              {(props.withTopTabs && isLoggedIn) ? (
                <ul className="nav nav-pills tenant-tabs">
                  <li
                    className={"nav-item"}
                    onClick={() => {
                      // setDarkBg(false);
                      history.push('/user?open=0')
                    }}
                  >
                    <a
                      className={
                        "nav-link" + (darkBg == false ? " active" : "")
                      }
                      data-toggle="pill"
                      href="#search"
                    >
                      SEARCH FOR TENANTS
                    </a>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => {
                      // setDarkBg(true);
                      history.push('/user?open=1')
                    }}
                  >
                    <a
                      className={"nav-link" + (darkBg == true ? " active" : "")}
                      data-toggle="pill"
                      href="#review"
                    >
                      LEAVE A REVIEW
                    </a>
                  </li>
                </ul>
              ) : (
                ""
              )}

              <div className="tab-content">
                {darkBg == false && (
                  <div className="tab-pane container active" id="search">
                    <h1 className="main-h1">SEARCH TENANT REVIEWS</h1>
                    <p className="main-p">
                      Find everything you need to know about your potential
                      tenant
                    </p>
                    <div className="input-group mt-4 mb-3 search-header-bar">
                      <input
                        type="text"
                        value={searchText}
                        onChange={(event) => {
                          setSearchText(event.target.value);
                          setSearchStatus(0)
                          setReviews([]);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            if(searchText.trim()==''){
                              createNotification('warning', 'Please enter search text');
                            }else{
                              setReviews([]);
                              searchReviews()
                            }
                              
                          }
                        }}
                        className="form-control"
                        placeholder="Enter Tenant Information To Find Reviews"
                      />
                      <div
                        onClick={() => {
                            if(searchText.trim()==''){
                              createNotification('warning', 'Please enter search text');
                            }else{
                              setReviews([]);
                              searchReviews()
                            }
                            
                        }}
                        className="input-group-append"
                      >
                        <span className="input-group-text">
                          <i className="bx bx-search-alt-2"></i>
                        </span>
                      </div>
                    </div>
                    <div className="advance-filter">
                      {
                        isLoggedIn && (
                          <a
                          href="#advanceFilter"
                          onClick={() => {
                            setReviews([]);
                            setSearchStatus(0)
                            setSearchText("");
                          }}
                          data-toggle="modal"
                        >
                          Advance Filter <i className="bx bxs-filter-alt"></i>
                        </a>
                        )
                      }
                     
                      <div className="modal" id="advanceFilter">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h4 className="modal-title">Advance Filter</h4>
                              <button
                                type="button"
                                id="close_button"
                                className="close"
                                data-dismiss="modal"
								data-toggle="tooltip"
                              >
                                <i className="bx bx-x"></i>
								  <div className="tooltip-div">Close</div>
                              </button>
                            </div>

                            <div className="modal-body">
                              <h2 className="modal-main-heading">
                                SEARCH TENANT REVIEWS
                              </h2>
                              <p className="main-fomr-heading">
                                Find Everything You Need To Know About Your
                                Potential Tenant
                              </p>
                              <form action="#">
                                <p className="modal-group-heading">
                                  Tenant Details
                                </p>

                                <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                      <label htmlFor="pwd">
                                        Tenant's Last Name:
                                      </label>
                                      <input
                                        type="text"
                                        onChange={(event) => {
                                          setSearchParams((prev) => ({
                                            ...prev,
                                            tenant_lname: event.target.value,
                                          }));
                                        }}
                                        className="form-control"
                                        id="pwd"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label htmlFor="first">
                                        Tenant's First Name:
                                      </label>
                                      <input
                                        type="text"
                                        onChange={(event) => {
                                          
                                          setSearchParams((prev) => ({
                                            ...prev,
                                            tenant_fname: event.target.value,
                                          }));
                                        }}
                                        className="form-control"
                                        id="email"
                                      />
                                    </div>
                                  </div>
                                 
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group datepicker-container-text">
                                      <label htmlFor="dob">
                                        Tenant's Date Of Birth:
                                      </label>
                                      <label>
                                      <DatePicker
                                        name="tenant_dob_search"
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="scroll"
                                        dateFormat="dd-MM-yyyy"
                                        selected={
                                          searchParams.tenant_dob != "" &&
                                          searchParams.tenant_dob
                                        }
                                        className="form-control"
                                        maxDate={endDateForDOB}
                                        onChange={(date, event) => {
                                          event.preventDefault();
                                          
                                          console.log(date, "date....");
                                          setSearchParams((prev) => ({
                                            ...prev,
                                            tenant_dob: date,
                                          }));
                                        }}
                                      />
                                       <i class='bx bx-calendar input_calendar_style' style={{top: '52%'}}></i> 
                                      </label>
                                      
                                      
                                    </div>
                                  </div>
                                </div>
                                <p className="modal-group-heading">
                                  Property Details
                                </p>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="form-group">
                                      <label htmlFor="email">
                                        Property Street Address:
                                      </label>
                                      <input
                                        onChange={(event) => {
                                           
                                          setSearchParams((prev) => ({
                                            ...prev,
                                            address: event.target.value,
                                          }));
                                        }}
                                        type="text"
                                        className="form-control"
                                        id="email"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label htmlFor="email">
                                        Property City:
                                      </label>
                                      <input
                                        onChange={(event) => {
                                           
                                          setSearchParams((prev) => ({
                                            ...prev,
                                            city: event.target.value,
                                          }));
                                        }}
                                        type="text"
                                        className="form-control"
                                        id="email"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label htmlFor="email">
                                        Property State:
                                      </label>
                                      <input
                                        onChange={(event) => {
                                            
                                          setSearchParams((prev) => ({
                                            ...prev,
                                            state: event.target.value,
                                          }));
                                        }}
                                        type="text"
                                        className="form-control"
                                        id="email"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>

                            <div className="modal-footer">
                              <button
                                type="button"
                                onClick={() => {
                                if(searchParams.city.trim()=="" && searchParams.state.trim()=="" && searchParams.address.trim()=="" && searchParams.tenant_fname.trim()=='' && searchParams.tenant_lname.trim()=="" && searchParams.tenant_dob==""){
                                  createNotification("warning", "Please enter any search field.")
                                }else{
                                  setSearchText("");
                                  setPage(1);
                                  // setSearchVal(1);
                                  setReviews([])
                                  searchReviews()

                                  document
                                    .getElementById("close_button")
                                    .click();
                                }
                                  
                                }}
                                className="btn btn-danger apply-filter-btn"
                              >
                                Search
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!isLoggedIn ? (
                      <p className="land-para">
                        are you a landlord? <Link to="/user/signup">Sign Up</Link> to leave a
                        review
                      </p>
                    ) : (
                      ""
                    )}
                  </div>
                )}

                {darkBg == true && (
                  <div className="tab-pane container active" id="review">
                    <Formik
                      initialValues={{
                        tenant_fname: "",
                        tenant_lname: "",
                        tenant_dob: tenatnDOBNew,
                        address: "",
                        state: "",
                        city: "",
                        lease_start_date: "",
                        lease_end_date: "",
                        comment: "",
                      }}
                      validationSchema={Yup.object().shape({
                        tenant_fname: Yup.string().required(
                          "Tenant's First Name is Required"
                        ).test('alphabets', "Tenant's First Name must only contain alphabets", (value) => {
                          return /^[A-Za-z?=.*[!@#\$%\^&\*]+$/.test(value);
                        }),
                        tenant_lname: Yup.string().required(
                          "Tenant's Last Name is Required"
                        ).test('alphabets', "Tenant's Last Name must only contain alphabets", (value) => {
                          return /^[A-Za-z?=.*[!@#\$%\^&\*]+$/.test(value);
                      }),
                        tenant_dob: Yup.string().required(
                          "Tenant's Date of Birth is Required"
                        ),
                        address: Yup.string().required(
                          "Property Street Address is Required"
                        ),
                        state: Yup.string().required(
                          "Property State is Required"
                        ),
                        city: Yup.string().required(
                          "Property City is Required"
                        ),
                        lease_start_date: Yup.string().required(
                          "Lease Start Date is Required"
                        ),
                        lease_end_date: Yup.string().required(
                          "Lease End Date is Required"
                        ),
                        comment: Yup.string().max(255, 'Must be 255 characters or less').required(
                          "Additional Information is Required"
                        ),
                      })}
                      validate={(values) => {
                        const errors = {};

                        return errors;
                      }}
                      onSubmit={async (
                        values,
                        { setSubmitting, resetForm }
                      ) => {
                        try {
                          if (!isImage) {
                              createNotification('warning', 'Lease of copy attachment is required')
                              return false;
                          } else {
                              if (selectedFile != '') {
                                  console.log(selectedFile.type, 'selectedFile.type')
                                  if (selectedFile.type == 'image/png' || selectedFile.type == 'image/jpg' || selectedFile.type == 'image/jpeg' || selectedFile.type == 'application/pdf' || selectedFile.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                                      values.copy_of_lease = selectedFile;
                                      values.copy_of_lease_file_name = document.getElementById('output_image_name').innerHTML;
                                      values.copy_of_lease_file_size = selectedFile.size;
                                  } else {
                                      createNotification('warning', 'Allowd attachment types are: png, jpg, jpeg, pdf,docx')
                                      return false;
                                  }
                              }

                          }
                          // let Ques = {
                          //   "Ques_id": 1,
                          //   "Ans": "1",
                          //   "Rating": "8"
                          // };
                          // values.ques_list
                          console.log(values, "values");
                          values.tenant_dob = formatDate_(tenatnDOBNew);
                          values.lease_start_date = formatDate_(leaseStartDate);
                          values.lease_end_date = formatDate_(leaseEndDate);

                          

                          if (selectedAnswers.length != QuestionList.length) {
                            setErrorMessages([
                              "All Rating question are required.",
                            ]);
                            return false;
                          }

                          values.ques_list = selectedAnswers.map((ans) => ({
                            ...ans,
                            rating: selectedRateValue[ans.ques_id],
                          }));
                          values.ques_list = JSON.stringify( values.ques_list)
                          const result = await createAction(
                            ActionNames.NEW_REVIEW,
                            {
                              ...values,
                            }
                          );
                          result.payload.then((res) => {
                            console.log(res, "res");
                            const data = res.data;
                            if (data.status == "success") {
                              dispatch(searchNotification());
                              createNotification("success", data.message);
                              // setSuccessMessage(data.message);
                              setSelectedAnswers([]);
                              setRateValue({});
                              setLeaseEndDate(new Date());
                              setLeaseStartDate(new Date());
                              setTenatnDOBNew(new Date());

                              //doing here

                              document.getElementById("output_image_container").style.display = "none";
                              setIsImage(false);
                            
                              setSelectedFile('');
                              resetForm();
                            } else if (data.status == "fail") {
                              // setErrorMessages(data.errors);
                              data.errors.map((err) => {
                                createNotification("warning", err);
                              });
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
                        /* and other goodies */
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
                                <label htmlFor="email">
                                  Tenant's Last Name <span class="req-span">*</span>
                                </label>

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
                                          <p className="required">
                                            {meta.error}
                                          </p>
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
                                  Tenant's First Name <span class="req-span">*</span>
                                </label>
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
                                          <p className="required">
                                            {meta.error}
                                          </p>
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
                                  Tenant's Date of Birth <span class="req-span">*</span>
                                </label>

                                <Field name="tenant_dob">
                                  {({ field, meta }) => {
                                    return (
                                      <div className="container-text datepicker-container-text">
                                        <label>
                                          <DatePicker
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="scroll"
                                            dateFormat="dd-MM-yyyy"
                                            selected={tenatnDOBNew}
                                            className="form-control"
                                            maxDate={endDateForDOB}
                                            onChange={(date, event) => {
                                              event.preventDefault();
                                              setTenatnDOBNew(date);
                                              values.tenant_dob = date;
                                            }}
                                          />
                                          <i class='bx bx-calendar input_calendar_style'></i>
                                        </label>

                                        {meta.touched && meta.error && (
                                          <p className="required">
                                            {meta.error}
                                          </p>
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
                                  Property Street Address <span class="req-span">*</span>
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
                                          <p className="required">
                                            {meta.error}
                                          </p>
                                        )}
                                      </div>
                                    );
                                  }}
                                </Field>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="email">Property City <span class="req-span">*</span></label>
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
                                          <p className="required">
                                            {meta.error}
                                          </p>
                                        )}
                                      </div>
                                    );
                                  }}
                                </Field>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="email">Property State <span class="req-span">*</span></label>
                                <Field name="state">
                                  {({ field, meta }) => {
                                    return (
                                      <div className="container-text">
                                        <select
                                          
                                          className="form-control"
                                          {...field}
                                        >
                                          <option value="">Select</option>
                                          {
                                            StateList.map(state => {
                                             return <option>{ state }</option>
                                            })
                                          }
                                          
                                        </select>
                                        {meta.touched && meta.error && (
                                          <p className="required">
                                            {meta.error}
                                          </p>
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
                                <label htmlFor="email">Lease Start Date <span class="req-span">*</span></label>
                                <Field name="lease_start_date">
                                  {({ field, meta }) => {
                                    values.lease_start_date = leaseEndDate;
                                    return (
                                      <div className="container-text datepicker-container-text">
                                        <label>
                                          <DatePicker
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="scroll"
                                            dateFormat="dd-MM-yyyy"
                                            selected={leaseStartDate}
                                            className="form-control"
                                            maxDate={endDateForDOB}
                                            onChange={(date,event) => {
                                              event.preventDefault();
                                              setLeaseStartDate(date);
                                              setLeaseEndDate(new Date());
                                              values.lease_start_date = date;
                                            }}
                                          />
                                          <i class='bx bx-calendar input_calendar_style'></i>
                                        </label>
                                       
                                        {meta.touched && meta.error && (
                                          <p className="required">
                                            {meta.error}
                                          </p>
                                        )}
                                      </div>
                                    );
                                  }}
                                </Field>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <label htmlFor="email">Lease End Date <span class="req-span">*</span></label>
                                <Field name="lease_end_date">
                                  {({ field, meta }) => {
                                    values.lease_end_date = leaseEndDate;
                                    return (
                                      <div className="container-text datepicker-container-text">
                                        <label>
                                          <DatePicker
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="scroll"
                                            dateFormat="dd-MM-yyyy"
                                            selected={leaseEndDate}
                                            className="form-control"
                                            minDate={leaseStartDate}
                                            maxDate={endDateForDOB}
                                            onChange={(date, event) => {
                                              event.preventDefault();
                                              setLeaseEndDate(date);
                                              values.lease_end_date = date;
                                            }}
                                          /> 
                                          <i class='bx bx-calendar input_calendar_style'></i>                                         
                                        </label>

                                        {meta.touched && meta.error && (
                                          <p className="required">
                                            {meta.error}
                                          </p>
                                        )}
                                      </div>
                                    );
                                  }}
                                </Field>
                              </div>
                            </div>
                          </div>
                          <p className="main-form-heading">Copy of Lease <span class="req-span">*</span></p>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                               
                                <div
                                  style={{marginBottom: '0px'}}
                                  className="drop-div"
                                  onDragOver={dragOver}
                                  onDragEnter={dragEnter}
                                  onDragLeave={dragLeave}
                                  onDrop={fileDrop}
                                >
                                  <div className="drop-zone">
                                     <span className="drop-zone__prompt">
                                      Drag and drop file here
                                    </span>
                                    <p className="or-drop">or</p>
                                    <button
                                      onClick={() => {
                                        document
                                          .getElementById("file_input")
                                          .click();
                                      }}
                                      type="button"
                                      className="upload-btn"
                                    >
                                      Browse files
                                    </button>
                                    <input type="file" name="myFile" className="drop-zone__input" id="file_input"
                                      onChange={(event) => {
                                        
                                        if (event.target.files[0] != '') {
                                          if (event.target.files[0].type == 'image/png' || event.target.files[0].type == 'image/jpg' || event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'application/pdf' || event.target.files[0].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                                         
                                            if (event.target.value) {
                                              setIsImage(true);
                                            }
                                            setSelectedFile(event.target.files[0]);
                                            document.getElementById('output_image_container').style.display = 'block';
                                            document.getElementById('output_image_name').innerHTML = event.target.files[0].name;
                                            document.getElementById('output_image_size').innerHTML = formatBytes(event.target.files[0].size, 0);

                                          }else{
                                              createNotification('warning', 'Allowd attachment types are: png, jpg, jpeg, pdf,docx')
                                          }
                                          event.target.value = null;
                                        }
                                         
                                      }}
                                      />
                                  </div>
                                  {
                                    <div
                                      className="drop-file-list"
                                      id="output_image_container"
                                    >
                                      <div className="file-item">
                                       
                                        <i class='bx bx-file'  style={{ fontSize: "42px", color:' #b5aeae' }}></i>
                                        <div className="file-detail-new">
                                          <p
                                            className="file-name-new"
                                            id="output_image_name"
                                          ></p>
                                          <p
                                            className="file-size"
                                            id="output_image_size"
                                          ></p>
                                          <i onClick={() => {
                                            if(window.confirm('are you sure you want remove it ?')===true){
                                              removeImg()
                                            }
                                          }} class='bx bx-minus-circle delete_review_icon'></i>
                                          <img
                                            src={checkfile}
                                            className="check-file"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  }
                               
                                </div>
                                <p class="custom-notice-error-white">Accepted document types png, jpg, jpeg, docx, pdf.</p> 
                              </div>
                            </div>
                          </div>
                      
                          <p className="main-form-heading">Tenant Ratings</p>
                          <div className="row">
                            <div className="col-md-12">
                            <div className="imposter-wrap" style={{display : 'none'}}>
                                    <div className="custom-control custom-radio custom-imposter-checkbox">
                                      <input type="radio" className="custom-control-input" id="customRadio"
                                             name="example1" value="customEx"/>
                                      <label className="custom-control-label input-success" htmlFor="customRadio">Yes</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-imposter-checkbox">
                                      <input type="radio" className="custom-control-input" id="customRadio1"
                                             name="example1" value="customEx1"/>
                                      <label className="custom-control-label input-danger" htmlFor="customRadio1">No</label>
                                    </div>
                                  </div>

                                  
                              {QuestionList.map((item, index) => (
                                <div className="form-group" key={item.ques_id}>
                                  <label className="main-label fdhy">
                                    {index + 1}. {item.ques}
                                  </label>
                                 
                                  <div className="imposter-wrap">
                                    <div className="custom-control custom-radio custom-imposter-checkbox">
                                      <input   className="custom-control-input"  onChange={() => {
                                        setCheckbox(item.ques_id, "yes");
                                      }}
                                      checked={
                                        selectedAnswers.find(
                                          (selectedAns) =>
                                            selectedAns.ques_id === item.ques_id
                                        )?.ans === "yes"
                                      }
                                      type="radio"
                                      name={item.ques_id}
                                      id={'yradio'+item.ques_id}
                                      />
                                      <label className="custom-control-label input-success" htmlFor={'yradio'+item.ques_id}>Yes</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-imposter-checkbox">
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
                                       id={'nradio'+item.ques_id}
                                       className="custom-control-input"  />
                                      <label className="custom-control-label input-danger" htmlFor={'nradio'+item.ques_id}>No</label>
                                    </div>
                                  </div>
                                  {/* <label className="option-label">
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
                                  </label> */}
                                   
                                  <div className="rating-div">
                                    <p>Rating:</p>
                                    <div
                                      className="rating"
                                      className={
                                        "rate-" +
                                        selectedRateValue[item.ques_id]
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
                                            <i className="bx bxs-star"></i>
                                          </label>
                                        );
                                      })}
                                    </div>
                                    {/* <div className="stars">
                                        <i className="bx bxs-star"></i>
                                        <i className="bx bxs-star"></i>
                                        <i className="bx bxs-star"></i>
                                        <i className="bx bxs-star"></i>
                                        <i className="bx bxs-star"></i>
                                        <i className="bx bxs-star empty"></i>
                                        <i className="bx bxs-star empty"></i>
                                        <i className="bx bxs-star empty"></i>
                                      </div> */}
                                  </div>
                                </div>
                              ))}
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
                                          <p className="required">
                                            {meta.error}
                                          </p>
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
                                className="btn loginFormBtn tab-btn"
                              >
                                SUBMIT REVIEW
                              </button>
                              <button
                                onClick={() => {
                                  if(window.confirm('Are you sure you want to clear this form')===true){
                                    setIsImage(false);
                                    setSelectedFile('');
                                    resetForm()
                                    document.getElementById("output_image_container").style.display = "none";
                                    setSelectedAnswers([])
                                    setRateValue({})
                                  }
                                }}
                                type="reset"
                                className="btn btn-primary clear-form-btn tab-btn"
                              >
                                CLEAR FORM
                              </button>
                            </div>
                          </div>
                          {successMessage && (
                            <div
                              className="row"
                              style={{ "margin-top": "10px" }}
                            >
                              <div className="col-md-12">
                                <h3 className="alert alert-success">
                                  {" "}
                                  {successMessage}{" "}
                                </h3>
                              </div>
                            </div>
                          )}
                          {errorMessages.map((error) => (
                            <div
                              className="row"
                              style={{ "margin-top": "10px" }}
                            >
                              <div className="col-md-12">
                                <h3 className="alert alert-danger">
                                  {" "}
                                  {error}{" "}
                                </h3>
                              </div>
                            </div>
                          ))}
                        </form>
                      )}
                    </Formik>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {!darkBg ? search : ""}
    </>
  );
};

SearchTenantReviews.propTypes = {};

export default SearchTenantReviews;
