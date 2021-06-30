import { React, Component, useEffect, useState, useCallback } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import {
  BASE_PATH_LEASE_ATTACHMENT,
  BASE_PATH_USERS,
} from "../../helpers/UploadDirectory";
import { ActionNames, createAction } from "../../services";
import user from "../../assets/images/avatar.png";
import { createNotification } from "../../helpers/notifications";
import { useSelector } from "react-redux";

const ReviewDetail = (props) => {
  const { id } = useParams();
  const [data, setData] = useState(false);
  const ratingsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const history = useHistory();
  const { userData } = useSelector((state) => {
    return {
      userData: state.authentication.user?.user_obj,
    };
  });
  const location = useLocation();
  const searchData = useCallback(async () => {
    try {
      const search = { review_id: id };
      const fetching = createAction(ActionNames.ADMIN_REVIEW_GET, search);
      const resp_data = fetching.payload;
      resp_data.then((resp) => {
        if(resp.data.status=='success'){
          if(props.user_type=='user'){
            let resp_data_ =resp.data.data;
            if(resp_data_.landlord_id!=userData.landlord_id){
              createNotification("info", "Invalid Data")
              history.push('/user/review-manager')
              return false;
            }
           }
          setData(resp.data.data);
        } else if(resp.data.status=='fail'){
          console.log(resp.data.errors)
          resp.data.errors.forEach(error => {
            createNotification('info',error)
          });
        }
        
      });
    } catch (e) {
      console.log(e);
    }
  });

  useEffect(() => {
    searchData();
  }, [location.pathname]);

  return (
    <>
      <div className="admin-card">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="admin-card-header user-manager-header">
                <h1>Review Detail</h1>
              </div>
            </div>
          </div>
          {!data && <p className="required">No data found.</p>}
          {data && (
            <div className="row table-row">
              <div className="col-md-12 p-0">
                <div className="detail-div">
                  <div className="username-td">
                    <img
                      src={
                        data.landlord.profile_photo != null
                          ? BASE_PATH_USERS + data.landlord.profile_photo
                          : user
                      }
                    />
                    <p>
                      {data.landlord.fname} {data.landlord.lname}{" "}
                      <small>(Landlord)</small>
                    </p>
                  </div>
                  <p>
                    <b>Tenant's First Name: </b> {data.tenant.tenant_fname}
                  </p>
                  <p>
                    <b>Tenant's Last Name: </b> {data.tenant.tenant_lname}
                  </p>
                  <p>
                    <b>Property Street Address:</b> {data.address}
                  </p>
                  <p>
                    <b>Property City:</b> {data.city}
                  </p>
                  <p>
                    <b>Property State:</b> {data.state}
                  </p>
                  <p>
                    <b>Lease Start Date:</b> {data.lease_start_date}
                  </p>
                  <p>
                    <b>Lease End Date:</b> {data.lease_end_date}
                  </p>
                  <p>
                    <b>Copy Of Lease:</b>{" "}
                    {data.copy_of_lease != null ? (
                      <a
                        target="blank"
                        href={BASE_PATH_LEASE_ATTACHMENT + data.copy_of_lease}
                      >
                        <i
                          class="bx bx-file"
                          style={{ fontSize: "23px", color: " #b5aeae" }}
                        ></i>
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </p>
                  <p>
                    <b>Tenant Ratings: </b> {data.overall_rating}
                  </p>
                  <p>
                    <b>Additional Information:</b> {data.comment}
                  </p>

                  <p>
                    <b>Status:</b>{" "}
                    <span
                      className={
                        "status " + (data.status == 1 ? "" : "cancel-status")
                      }
                    >
                      {data.status == 0 && "Pending"}
                      {data.status == 1 && "Publish"}
                      {data.status == 2 && "Denied"}
                    </span>
                  </p>
                  {/* <p>
                    <b>Review Text:</b> Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Ab ad animi aperiam, at consequatur
                    corporis deserunt dignissimos eum exercitationem explicabo
                    fugit illum ipsa nam nesciunt non obcaecati odio odit
                    pariatur quasi repellendus, sed sequi similique suscipit
                    temporibus veritatis voluptas voluptatibus! Consectetur
                    consequatur eaque error id laborum maiores praesentium
                    recusandae repellat! Totam, voluptate.
                  </p> */}

                  <div
                    className="action-div-admin detail-action"
                    style={{ display: "none" }}
                  >
                    <a
                      type="button"
                      className="edit"
                      href="/admin/update-review/42"
                    >
                      <i className="bx bx-pencil"></i>
                    </a>
                    <button type="button" className="edit">
                      <i className="bx bx-reset"></i>
                    </button>
                    <button type="button" className="delete">
                      <i className="bx bxs-trash-alt"></i>
                    </button>
                  </div>
                  <br />
                  <h2 className="expand-h">Tenant FAQ's</h2>
                  <div className="row">
                    <div className="col-md-12">
                      {data.ques_list.map((ques, i_) => {
                        return (
                          <div key={i_} className="form-group">
                            <label className="main-label">
                              {i_ + 1}. {ques.ques.ques}
                            </label>
                            <div className="imposter-wrap">
                                <div className="custom-control custom-radio custom-imposter-checkbox">
                                  <input type="radio" readOnly="true" checked={ques.ans=='yes' ? true: false} className="custom-control-input" id={'yradio'+i_} />
                                  <label className="custom-control-label input-success" htmlFor={'yradio'+i_}>Yes</label>
                                </div>
                                <div className="custom-control custom-radio custom-imposter-checkbox">
                                  <input type="radio" readOnly="true" checked={ques.ans=='no' ? true: false} className="custom-control-input" id={'nradio'+i_} />
                                  <label className="custom-control-label input-danger" htmlFor={'nradio'+i_}>No</label>
                                </div>
                              </div>
                            <div className="rating-div">
                              <p>Ratings:</p>
                              <div className={"rate-" + ques.rating}>
                                {ratingsList.map((rating) => {
                                  return (
                                    <label>
                                      <i
                                        className={
                                          "bx bxs-star " +
                                          (rating > ques.rating ? "empty" : "")
                                        }
                                      ></i>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReviewDetail;
