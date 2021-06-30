import { React, Component, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import { BASE_PATH_BLOGS } from "../../../helpers/UploadDirectory";
import { ActionNames, createAction } from "../../../services";
import user from "../../../assets/images/avatar.png";

const BlogDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(false);
  const searchData = useCallback(async () => {
    try {
      const search = { id: id };
      const fetching = createAction(ActionNames.ADMIN_BLOG_GET, search);
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
  }, []);

  return (
    <>
      <div className="admin-card">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="admin-card-header user-manager-header">
                <h1>Blog Detail</h1>
              </div>
            </div>
          </div>
          {data && (
            <div className="row table-row">
              <div className="col-md-12 p-0">
                <div className="detail-div">
                  <div className="">
                  {
                    data.id > 22 ?
                    <img className="" src={BASE_PATH_BLOGS + data.image}  alt="" />
                    :

                    <img className="" src={data.image}  alt="" />
                    }
                    <p></p>
                  </div>
                  <p>
                    <b>Title:</b> {data.title}
                  </p>
                  <p>
                    <b>Tag:</b> {data.tag === null ? 'N/A' : data.tag}
                  </p>
                  <p>
                    <b>Category:</b> {data.get_category.title}
                  </p>
                  <p>
                    <b>Description:</b> {data.desc}
                  </p>
                   
                  <p>
                    <b>Meta Title:</b> {data.meta_title}
                  </p>

                  <p>
                    <b>Meta Description:</b> {data.meta_description}
                  </p>
                  <p>
                    <b>Meta Keywords:</b> {data.meta_keywords}
                  </p>
                  <p>
                    <b>Status:</b>  <span
                                            className={
                                                "status " +
                                                (data.status == 1 ? "" : "cancel-status")
                                            }
                                        >
                                            {data.status == 0 && 'Pending'}
                                            {data.status == 1 && 'Publish'}
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

export default BlogDetail;
