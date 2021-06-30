import React, { Component, useCallback, useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router";
import { createAction, ActionNames } from "../../../services";
const VerifyEmail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const postId = useCallback(async () => {
    try {
      setLoading(true);
      let search = {
        id: id,
      };

      const request_ = createAction(ActionNames.VERIFY_EMAIL, search);
      const req_resp = await request_.payload;
      const data = req_resp.data;
      if (data.status == "success") {
        setSuccessMessage(data.message);
        setTimeout(() => {
          history.push("/user/login");
        }, 3000);
      } else if (data.status == "fail") {
        setErrorMessages(data.errors);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    postId();
  }, []);

  return (
    <>
      <Helmet>
        <title>Verify Email | Landlordstalk</title>
        <meta name="description" content="Verify Email | Landlordstalk" />
    </Helmet>
      <section className="blog-header-section">
        <div className="container-fluid">
          <div className="row  d-flex text-center">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <br />
              <br />
              <h1>Verify Email</h1>
              {loading != false && (
                <p className="alert alert-warning">Loading..</p>
              )}
              {successMessage && (
                <div className="row" style={{ "margin-top": "10px" }}>
                  <div className="col-md-12">
                    <h3 className="alert alert-success"> {successMessage} </h3>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default VerifyEmail;
