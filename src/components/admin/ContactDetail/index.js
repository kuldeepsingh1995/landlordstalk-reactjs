import { React, Component, useEffect, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router";
import { BASE_PATH_USERS } from "../../../helpers/UploadDirectory";
import { ActionNames, createAction } from "../../../services";
import user from "../../../assets/images/avatar.png";

const ContactDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(false);
  const location = useLocation();
  const searchData = useCallback(async () => {
    try {
      const search = { id: id };
      const fetching = createAction(ActionNames.ADMIN_CONTACT_GET, search);
      const resp_data = fetching.payload;
      resp_data.then((resp) => {
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
                <h1>Contact Detail</h1>
              </div>
            </div>
          </div>
          {data && (
            <div className="row table-row">
              <div className="col-md-12 p-0">
                <div className="detail-div">
                  <div className="username-td">
                    <p>{data.email}</p>
                  </div>
                  <p>
                    <b>First Name:</b> {data.first_name}
                  </p>
                  <p>
                    <b>Last Name:</b> {data.last_name}
                  </p>
                  <p>
                    <b>Email:</b> {data.email}
                  </p>
                  <p>
                    <b>Message:</b> {data.message}
                  </p>

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

export default ContactDetail;
