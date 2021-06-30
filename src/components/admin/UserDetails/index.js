import { React, Component, useEffect, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router";
import { BASE_PATH_USERS } from "../../../helpers/UploadDirectory";
import { ActionNames, createAction } from "../../../services";
import user from "../../../assets/images/avatar.png";

const UserDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(false);
  const location = useLocation();
  const searchData = useCallback(async () => {
    try {
      const search = { landlord_id: id };
      const fetching = createAction(ActionNames.ADMIN_USER_GET, search);
      const resp_data = fetching.payload;
      resp_data.then((resp) => {
        console.log(resp.data.data);
        setData(resp.data.data);
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
                <h1>User Detail</h1>
              </div>
            </div>
          </div>
          {data && (
            <div className="row table-row">
              <div className="col-md-12 p-0">
                <div className="detail-div">
                  <div className="username-td">
                    <img src={data.profile_photo != null ? BASE_PATH_USERS +  data.profile_photo : user} />
                    <p>{data.fname} {data.lname}</p>
                  </div>
                  <p>
                    <b>Username:</b> {data.username}
                  </p>
                  <p>
                    <b>Email:</b> {data.email}
                  </p>
                  <p>
                    <b>Reviews:</b> {data.reviews}
                  </p>
                  <p>
                    <b>Subscription:</b> {data.subscription}
                  </p>
                  <p>
                    <b>Expiry Date:</b> {data.expiry_date}
                  </p>
                  <p>
                    <b>Status:</b> <span className={
                                            "status " +
                                            (data.status == 1 ? "" : "cancel-status")
                                        }
                                    >
                                        {data.status == 1 ? "Active" : "Inactive"}
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
                  
                  <div className="action-div-admin detail-action" style={{display: "none"}}>
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
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
