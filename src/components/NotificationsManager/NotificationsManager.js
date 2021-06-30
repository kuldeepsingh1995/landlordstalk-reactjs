import {React, Component, useState, useCallback, useEffect} from "react";
import "./index.css";
import user from "../../assets/images/avatar.png";
import user2 from "../../assets/images/r.png";
import {ActionNames, createAction} from "../../services";
import ReactPaginate from "react-paginate";
import {createNotification} from "../../helpers/notifications";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import { useHistory, useLocation, useParams } from "react-router";
import queryString from 'query-string'
import { BASE_PATH_USERS } from "../../helpers/UploadDirectory";
import { searchNotification } from "../../helpers/searchNotifications";
import { useDispatch } from "react-redux";
import { setNotificationRead } from "../../helpers/setNotificationRead";

const NotificationsManager = (props) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [checks, setChecks] = useState({});
    const [searchText, setSearchText] = useState('');
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const history= useHistory();
    const dispatch = useDispatch();
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


 
    function changePaginate(paginate_data) {
        // setPage(page+1)
        setPage(paginate_data.selected + 1);
    }

    const searchData = useCallback(async () => {
        try {
          var TopSearchText = getParameterByName('TopSearchText'); // "lorem"
          let search;
          if(TopSearchText){
             search = {page: page, search: TopSearchText, orderBy};
          }else{
             search = {page: page, search: searchText, orderBy};
          }
            if(props.user_type=='user'){
                let user_ = localStorage.getItem('llt_user_obj');
                user_ = JSON.parse(user_)
                search.landlord_id =  user_.landlord_id;
            }
            const fetching = createAction(ActionNames.ADMIN_NOTIFICATION_SEARCH, search);
            const resp_data = fetching.payload;
            resp_data.then((resp) => {
                setLastPage(resp.data.data.last_page);
                setData(resp.data.data.data);
            });
        } catch (e) {
            console.log(e);
        }
    });

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

    function checkAll(event) {
        const obj = {};
        if (event.target.checked) {
            data.forEach((el) => {
                obj[el.landlord_id] = true;
            });
        }
        setChecks(obj);
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
      setPage(1)
      searchData();
    }, [searchText]);
    return (
        <>
            <div className="admin-card">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="admin-card-header user-manager-header">
                                <h1>Notification Manager</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row search_actions_row new_custom_dispaly_none">
                      <div className="col-md-4">
                            <div class="form-group">

                                <input type="text"
                                       class="form-control" placeholder="Search" onKeyUp={(event) => {
                                    if (event.target.value.length >= 2) {
                                        setSearchText(event.target.value)
                                    } else if (event.target.value.length == 0) {
                                        setSearchText(event.target.value)
                                    }
                                }}/>
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
                                        <th className="new_custom_dispaly_none">
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id="customCheck"
                                                    name="check_all"
                                                    onClick={checkAll}
                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor="customCheck"
                                                ></label>
                                            </div>
                                        </th>
                                        {
                                            props.user_type=='admin' && (
                                                <th>
                                                    <div className="td-wrap">
											    <div className="sort-wrap" onClick={
                                                        () => {
                                                            setOrderBy((prev) => ({
                                                                user_name: !orderBy.user_name,
                                                            }))
                                                        }
                                                    }>
                                                    <i className={`bx bxs-chevron-up ${ (orderBy.user_name!== undefined) ? (!orderBy?.user_name ? 'orderByActive' : 'orderByUnActive') : ''}`}></i>
                                                    <i className={`bx bxs-chevron-down ${ (orderBy.user_name!== undefined) ? (orderBy?.user_name ? 'orderByActive' : 'orderByUnActive') : ''}`} ></i>
                                                </div>
                                                Landlord Name</div></th>
                                            )
                                        }
                                        
                                        <th>
                                        <div className="td-wrap">
											    <div className="sort-wrap" onClick={
                                                        () => {
                                                            setOrderBy((prev) => ({
                                                                title: !orderBy.title,
                                                            }))
                                                        }
                                                    }>
                                                    <i className={`bx bxs-chevron-up ${ (orderBy.title!== undefined) ? (!orderBy?.title ? 'orderByActive' : 'orderByUnActive') : ''}`}></i>
                                                    <i className={`bx bxs-chevron-down ${ (orderBy.title!== undefined) ? (orderBy?.title ? 'orderByActive' : 'orderByUnActive') : ''}`} ></i>
                                                </div>
                                                Notification</div>
                                            </th>
                                        <th>
                                            <div className="td-wrap">
											    <div className="sort-wrap" onClick={
                                                        () => {
                                                            setOrderBy((prev) => ({
                                                                created_at: !orderBy.created_at,
                                                            }))
                                                        }
                                                    }>
                                                    <i className={`bx bxs-chevron-up ${ (orderBy.created_at!== undefined) ? (!orderBy?.created_at ? 'orderByActive' : 'orderByUnActive') : ''}`}></i>
                                                    <i className={`bx bxs-chevron-down ${ (orderBy.created_at!== undefined) ? (orderBy?.created_at ? 'orderByActive' : 'orderByUnActive') : ''}`} ></i>
                                                </div>
                                            Create Date</div>
                                        </th>
                                        <th className="new_custom_dispaly_none">Edit / Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.length > 0 &&
                                    data.map((row, i) => {
                                        return (
                                            <tr className={(row.is_read==1 ? 'review-viewed' : '')} key={i} style={{cursor: 'pointer'}}  onClick={() => { 
                                                dispatch(setNotificationRead(row.id, props.user_type))

                                                switch (row.for_action) {
                                                    case 'subscription_footer_submission':
                                                        history.push('/'+props.user_type+'/contact-manager/'+row.subject_id)
                                                        break;
                                                    case 'contact_us_submision':
                                                        history.push('/'+props.user_type+'/contact-manager/'+row.subject_id)
                                                        break;
                                                    case 'review_add':
                                                        history.push('/'+props.user_type+'/review-manager/'+row.subject_id)
                                                        break;
                                                    case 'review_edit':
                                                        history.push('/'+props.user_type+'/review-manager/'+row.subject_id)
                                                        break;
                                                    case 'landlord_new_registeration':
                                                        history.push('/'+props.user_type+'/user-manager/'+row.subject_id)
                                                        break;
                                                    case 'admin_approve_review':
                                                        history.push('/'+props.user_type+'/review-manager/'+row.subject_id)
                                                        break;
                                                    case 'admin_disapprove_review':
                                                        history.push('/'+props.user_type+'/review-manager/'+row.subject_id)
                                                        break;
                                                    case 'admin_delete_review':
                                                        history.push('/'+props.user_type+'/review-manager/'+row.subject_id)
                                                        break;
                                                    case 'review_delete':
                                                            history.push('/'+props.user_type+'/review-manager/'+row.subject_id)
                                                            break;
                                                        
                                                    default:
                                                        break;
                                                }
                                                
                                                }}>
                                                <td className="new_custom_dispaly_none">
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
                                                
                                                {
                                                    (props.user_type=='admin') && (
                                                        <td>
                                                            <div className="username-td">
                                                                {
                                                                    (row.get_user!=null) && (
                                                                        <img src={(row.get_user) ? (row.get_user.profile_photo!=null  ? BASE_PATH_USERS + row.get_user.profile_photo : user ) : user}/>                                                               
                                                                    )
                                                                }
        
                                                                <p>{row.get_user? row.get_user.username : ''}</p>
                                                            </div>
                                                        </td>
                                                    )
                                                }
                                                

                                                <td>{row.title}</td>
                                                <td>{row.create_date}</td>
                                                <td className="new_custom_dispaly_none">
                                                    <div className="action-div-admin">
                                                        <button onClick={() => {openModal(row)}} type="button" className="edit">
                                                            <i className="bx bx-pencil"></i>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                delete_row(row, i);
                                                            }}
                                                            className="delete"
                                                        >
                                                            <i className="bx bxs-trash-alt"></i>
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

export default NotificationsManager;
