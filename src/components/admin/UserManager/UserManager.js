import {React, Component, useState, useCallback, useEffect} from "react";
import "./UserManager.css";
import user from "../../../assets/images/avatar.png";
import user2 from "../../../assets/images/r.png";
import {ActionNames, createAction} from "../../../services";
import ReactPaginate from "react-paginate";
import {createNotification} from "../../../helpers/notifications";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import { useLocation, useParams, useHistory } from "react-router";
import queryString from 'query-string'
import { BASE_PATH_USERS } from "../../../helpers/UploadDirectory";
import { Link } from "react-router-dom";
import zIndex from "@material-ui/core/styles/zIndex";

const UserManager = (props) => {
  const location = useLocation();
  const history = useHistory();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [checks, setChecks] = useState({});
    const [allCheck, setAllCheck] = useState(false);
    const [searchText, setSearchText] = useState(location.search.replace('?TopSearchText=', ''));
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const [orderBy, setOrderBy] = useState({});

    const modalStyles = {
        background:"black",
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius:"10px",
            padding: "0"
        }
    };
    var subtitle;
    function getParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
 
  
    // handleQueryString()
    const [modalData, setModalData] = useState({
      show:false,
      data: null
    });

    function openModal(data_) {
      setModalData({
          show: true,
          data: data_
        });
    }


    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    function closeModal() {
      setModalData({
          data: null,
          show: false
        });
    }

    function changePaginate(paginate_data) {
        // setPage(page+1)
        setPage(paginate_data.selected + 1);
    }

    const searchData = async (currentPage, unset_search = false) => {
      try {
        var TopSearchText = getParameterByName('TopSearchText'); // "lorem"
        let search;
        if(unset_search && TopSearchText==null){
          search = {page: currentPage || page, search: '', orderBy};
        }else{
          if(TopSearchText){
            search = {page: currentPage || page, search: TopSearchText, orderBy};
          }else{
              search = {page: currentPage || page, search: searchText, orderBy};
          }
        }
        
          const fetching = createAction(ActionNames.ADMIN_USER_LIST, search, false);
          const resp_data = fetching.payload;
          resp_data.then((resp) => {
              setLastPage(resp.data.data.last_page);
              setData(resp.data.data.data);
          });
      } catch (e) {
          console.log(e);
      }
  }

    function deleteMultiple() {
        if (window.confirm("Are you sure ?") === true) {
            let checkArr = Object.keys(checks);
            if (!checkArr.length) {
                createNotification('info', "Select Atleast one row");
                return false;
            } else {
                try {
                    createNotification("success", "Users Deleted Successfully");
                    const result = Object.keys(checks).filter((singleKey) => checks[singleKey])
                    const postData = {ids: result};
                    const fetching = createAction(
                        ActionNames.ADMIN_USER_DELETE,
                        postData
                    );
                    const resp_data = fetching.payload;
                    resp_data.then((resp) => {
                        searchData();
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

    
   

    function checkUncheck(isChecked, actionId) {
        setChecks((prevState) => {
            const state = {...prevState};
            state[actionId] = !prevState[actionId];
            return state;
        });
    }

    function delete_row(row, i) {
        if (window.confirm("Are you sure ?") === true) {
            try {
                createNotification("success", "User Deleted Successfully");

                const postData = {ids: [row.landlord_id]};

                const fetching = createAction(ActionNames.ADMIN_USER_DELETE, postData);
                const resp_data = fetching.payload;
                resp_data.then((resp) => {
                    searchData();
                });
            } catch (e) {
                console.log(e);
            }
        }
    }
 
    useEffect(() => {
      searchData();
    }, [page, orderBy]);

    useEffect(() => {
      setSearchText(location.search.replace('?TopSearchText=', ''))
      setPage(1);
      searchData(1, true);

    }, [location.search]);

    useEffect(() => {
      // setPage(1);
      // searchData();
      // alert(searchText)
     
    }, [searchText]);  

    useEffect(() => {
      const obj = {};
        
      if(allCheck){ 
          data.forEach((el) => {
            obj[el.landlord_id] = true;
        });
      }
      setChecks(obj);
    }, [allCheck])
    return (
        <>
            {modalData.show && ( <Modal
                isOpen={modalData.show}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Example Modal"
            >

                <div className="r-modal-header">
                    <p className="r-heading">Edit</p>
                    <button className="r-close" onClick={closeModal}><i className='bx bx-x'></i></button>
                </div>
                <div className="container r-modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <Formik
                          initialValues={{
                            fname: modalData.data.fname,
                            lname: modalData.data.lname,
                            username: modalData.data.username,
                            email: modalData.data.email,
                            status: modalData.data.status,
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
                            status: Yup.string().required("Status is Required"),
                          
                          })}
                          validate={(values) => {
                            const errors = {};
                           
                            return errors;
                          }}
                          onSubmit={async (values, {setSubmitting}) => {
                            try {

                              values.id = modalData.data.landlord_id;
                              const result = await createAction(ActionNames.ADMIN_USER_UPDATE, {
                                ...values
                              });
                              result.payload.then(res => {
                                console.log(res, 'res');
                                const data = res.data;
                                if (data.status == 'success') {
                                  setSuccessMessage(data.message);
                                  searchData()
                                  setTimeout(() => {
                                    closeModal()
                                  }, 500);

                                } else if (data.status == 'fail') {
                                  setErrorMessages(data.errors);
                                  /*this.setState({errorMessages:  data.errors})*/
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

                          }) => (

                            <form onSubmit={handleSubmit} className="loginForm" id="loginFomr">
                              <div className="row">
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
                                                  type="email"
                                                  readOnly="true"
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
                                    <label htmlFor="pwd">Status <span class="req-span">*</span></label>
                                    <Field name="status">
                                      {({field, meta}) => {
                                        return (
                                            <div className="container-text">
                                              <select className="form-control" {...field}>
                                                <option value="0"> Inactive</option>
                                                <option value="1"> Active</option>
                                              </select>
                                              
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
                                  <button
                                      onSubmit={handleSubmit}
                                      disabled={isSubmitting}
                                      type="submit"
                                      className="btn btn-primary loginFormBtn"
                                  >
                                    UPDATE
                                  </button>
                                </div>
                                <div className="col-md-6">

                                </div>
                              </div>

                            </form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
            </Modal>)}
            <div className="admin-card">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="admin-card-header user-manager-header">
                                <h1>Users Manager</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row search_actions_row">
                      <div className="col-md-4">
                      <div class="input-group">
                      <input type="text"
                            id="searchText"
                                      value={searchText}
                                      onChange={(e) => {
                                        let searchText_ = e.target.value;
                                        console.log(searchText_)
                                        setSearchText(searchText_)
                                        // if (searchText_.length >= 2) {
                                        //     setSearchText(searchText_)
                                        // } else if (searchText_.length == 0) {
                                        //     setSearchText(searchText_)
                                        // }
                                      }}
                                       className="form-control" placeholder="Search"  />
                        <div class="input-group-prepend"  onClick={() => {
                                                      history.replace(`${location.pathname}?TopSearchText=${searchText}`)

                                                                }}>
                              <span
                              class="input-group-text "
                              id="validationTooltipUsernamePrepend"

                              >
                              
                                  <i
                                  style={{cursor: 'pointer'}}
                                  class="bx bx-search"
                                 
                                  ></i>
                            
                              </span>
                          </div>
                      </div>
                              

                              

                         </div>
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <button className="btn btn-danger admin_delete_button" onClick={deleteMultiple}>Delete</button>
                        </div>
                        
                    </div>
                    <div className="row table-row">

                        <div className="col-md-12 p-0">
                            <div className="table-responsive">
                                <table className="table admin-table">
                                    <thead>
                                    <tr>
                                        <th>
											
                                            <div
                                                className="custom-control custom-checkbox"
                                                onClick={()=> {
                                                  setAllCheck(prev => !prev);
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input custom-checkbox"
                                                    id="customCheck1"
                                                    name="check_all"
                                                    onClick={()=> {
                                                      setAllCheck(prev => !prev);
                                                    }}
                                                    checked={allCheck}
                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor={`customCheck1`}
                                                ></label>
                                            </div>

                                            {/*<div className="custom-control custom-checkbox" >
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id="customCheck"
                                                    name="check_all"

                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor="customCheck"
                                                ></label>
                                            </div>*/}
                                        </th>
                                        {/* <th>User ID</th> */}
                                        <th>
											<div className="td-wrap">
											<div className="sort-wrap" onClick={
                                                 () => {
                                                    setOrderBy((prev) => ({
                                                        username: !orderBy.username,
                                                    }))
                                                 }
                                             }>
												<i className={`bx bxs-chevron-up ${ (orderBy.username!== undefined) ? (!orderBy?.username ? 'orderByActive' : 'orderByUnActive') : ''}`}></i>
												<i className={`bx bxs-chevron-down ${ (orderBy.username!== undefined) ? (orderBy?.username ? 'orderByActive' : 'orderByUnActive') : ''}`} ></i>
											</div> Username
											</div>
                                        </th>
                                        <th>
											<div className="td-wrap">
											<div className="sort-wrap" onClick={
                                                 () => {
                                                    setOrderBy((prev) => ({
                                                        email: !orderBy.email,
                                                    }))
                                                 }
                                             }>
												<i className={`bx bxs-chevron-up ${ (orderBy.email!== undefined) ? (!orderBy?.email ? 'orderByActive' : 'orderByUnActive') : ''}`}></i>
												<i className={`bx bxs-chevron-down ${ (orderBy.email!== undefined) ? (orderBy?.email ? 'orderByActive' : 'orderByUnActive') : ''}`} ></i>
											</div>
                      Email</div>
                                        </th>
                                        <th>
											<div className="td-wrap">
											Reviews
											</div>
                                        </th>
                                        <th>
											<div className="td-wrap">
											Subscription
											</div>
                                        </th>
                                        <th>
											<div className="td-wrap">
											Expirty Date</div>
                                        </th>
                                        <th>
											<div className="td-wrap">
											<div className="sort-wrap" onClick={
                                                 () => {
                                                    setOrderBy((prev) => ({
                                                        status: !orderBy.status,
                                                    }))
                                                 }
                                             }>
												<i className={`bx bxs-chevron-up ${ (orderBy.status!== undefined) ? (!orderBy?.status ? 'orderByActive' : 'orderByUnActive') : ''}`}></i>
												<i className={`bx bxs-chevron-down ${ (orderBy.status!== undefined) ? (orderBy?.status ? 'orderByActive' : 'orderByUnActive') : ''}`} ></i>
											</div>
                                            <div className="status-wrap">
                                                {" "}
                                                <span>Status</span>
                                            </div>
											</div>
                                        </th>
                                        <th>
											<div class="td-wrap">
												Edit / Delete
											</div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.length == 0 ?
                                    
                                    ((searchText!='') && <p className="required">no data available</p>)  
                                    
                                    :
                                    
                                    data.map((row, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>
                                                    <div
                                                        className="custom-control custom-checkbox"
                                                        onClick={() =>
                                                            checkUncheck(
                                                                checks[row.landlord_id],
                                                                row.landlord_id
                                                            )
                                                        }
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="custom-control-input"
                                                            id={`landlord_${row.landlord_id}`}
                                                            name={"check_" + row.landlord_id}
                                                            checked={!!checks[row.landlord_id]}
                                                            onChange={() =>
                                                                checkUncheck(
                                                                    checks[row.landlord_id],
                                                                    row.landlord_id
                                                                )
                                                            }
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor={`landlord_${row.landlord_id}`}
                                                        ></label>
                                                    </div>
                                                </td>
                                                {/* <td>{row.username}</td> */}
                                                <td>
                                                    <div className="username-td">

                                                        <img src={row.profile_photo != null ? BASE_PATH_USERS +  row.profile_photo : user}/>
                                                        <p>{row.username}</p>
                                                    </div>
                                                </td>
                                                <td>{row.email}</td>
                                                <td>{row.reviews}</td>
                                                <td>{row.subscription}</td>
                                                <td>{row.expiry_date}</td>
                                                <td>
                                                    <div
                                                        className={
                                                            "status " +
                                                            (row.status == 1 ? "" : "cancel-status")
                                                        }
                                                    >
                                                        {row.status == 1 ? "Active" : "Inactive"}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="action-div-admin">
                                                        <Link to={"/admin/user-manager/" + row.landlord_id} data-toggle="tooltip" title="View" className="edit">
                                                            <i className="bx bxs-show"></i>
                                                            <div className="tooltip-div">
                                                                View
                                                            </div>
                                                        </Link>
                                                        <button onClick={() => {openModal(row)}} type="button" className="edit" data-toggle="tooltip" title="Edit">
                                                            <i className="bx bx-pencil"></i>
                                                            <div className="tooltip-div">
                                                                Edit
                                                            </div>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                delete_row(row, i);
                                                            }}
                                                            className="delete"
                                                            data-toggle="tooltip" title="Delete"
                                                        >
                                                            <i className="bx bxs-trash-alt"></i>
                                                            <div className="tooltip-div">
                                                                Delete
                                                            </div>
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>

                            <ReactPaginate
                                previousLabel={<i className="bx bx-chevron-left"></i>}
                                nextLabel={<i className="bx bx-chevron-right"></i>}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={lastPage}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={changePaginate}
                                containerClassName={"pagination admin-pagination"}
                                pageLinkClassName={"page-link"}
                                pageClassName={"page-item"}
                                activeClassName={"active-li"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserManager;
