import { React, Component, useState, useCallback } from "react";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import google from "../../../assets/images/google-icon.png";
import facebook from "../../../assets/images/Facebook Logo.png";
import { Field, Form, Formik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { createAction, ActionNames } from "../../../services";
import { UserConstants } from "../../../constants/UserConstants";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createNotification } from "../../../helpers/notifications";

const BlogCreate = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState('');
  const [isImage, setIsImage] = useState(false);
  const [ImagePath, setImagePath] = useState('false');
  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [blogData, setBlogData] = useState({});
  const { isLoggedIn } = useSelector((state) => {
    return {
      isLoggedIn: state.authentication.admin?.loggedIn,
    };
  });
  const fetchBlog = useCallback(async () => {

    try {
       const search = {id: id}
        const result = await createAction(ActionNames.ADMIN_BLOG_GET, search);
        result.payload.then((res) => {
          const data = res.data;
          if (data.status == "success") {
              setBlogData(data.data);
              if(id){
                setIsImage(true)
               
              }
           } else if (data.status == "fail") {
            setErrorMessages(data.errors);
          }
        });
      } catch (e) {
        console.log(e);
      }
})
const fetchBlogCategories = useCallback(async () => {

    try {
        const result = await createAction(ActionNames.ADMIN_BLOG_CATEGORY_SEARCH);
        result.payload.then((res) => {
          const data = res.data;
          if (data.status == "success") {
              setCategories(data.data);
           } else if (data.status == "fail") {
              setErrorMessages(data.errors);
          }
        });
      } catch (e) {
        console.log(e);
      }
})

useState(() => {
  if(id){
    fetchBlog()
  }
  
    fetchBlogCategories()
}, [])

  return (
    <div className="admin-card">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="admin-card-header user-manager-header">
              <h1>{id ? 'Update' : 'Create'} Blog</h1>
            </div>
          </div>
        </div>

       
          <div className="row">
            <div className="col-md-12">
              <Formik
                initialValues={{
                  meta_title: (id ? blogData.meta_title : ''),
                  meta_description: (id ? blogData.meta_description : ''),
                  meta_keywords: (id ? blogData.meta_keywords : ''),
                  title: (id ? blogData.title : ''),
                  tag: (id ? (blogData.tag==null ? '' : blogData.tag) : ''),
                  desc: (id ? blogData.desc : ''),
                  category_id: (id ? blogData.category_id : ''),
                   status: (id ? blogData.status : ''),
                }}
                enableReinitialize
                validationSchema={Yup.object().shape({
                  title: Yup.string().required(
                    "Blog Title is Required"
                  ),
                  tag: Yup.string(),
                  
                  category_id: Yup.string().required(
                    "Category is Required"
                  ),
                 
                  desc: Yup.string().required(
                    "Description is Required"
                  ),
                   
                  status: Yup.string().required("Status is Required"),
                  meta_title: Yup.string().required("Meta title is Required"),
                  meta_description: Yup.string().required("Meta Description is Required"),
                  meta_keywords: Yup.string().required("Meta Keywords is Required"),

                })}
                validate={(values) => {
                  const errors = {};
                    
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                      if(!isImage){
                          createNotification('warning', 'Image is required')
                          return false;
                      }else{
                          if(selectedFile!='') {
                            if(selectedFile.type=='image/png' || selectedFile.type=='image/jpg' || selectedFile.type=='image/jpeg'){
                              values.image = selectedFile;
                            }else{
                              createNotification('warning', 'Invalid Image Type')
                              return false;
                            }
                          }
                          
                      }
                     if(id){
                       values.id = blogData.id;
                     }
                    const result = await createAction(ActionNames.ADMIN_BLOG_ACTION, {
                      ...values,
                    });
                    result.payload.then((res) => {
                      const data = res.data;
                      if (data.status == "success") {
                        createNotification('success', data.message)
                        history.push('/admin/blog-manager')
                        setSuccessMessage(data.message);
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
                          <label htmlFor="email">Meta Title <span className="req-span">*</span></label>
                          <Field name="meta_title">
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
                          <label htmlFor="email">Meta Keywords <span className="req-span">*</span></label>
                          <Field name="meta_keywords">
                            {({ field, meta }) => {
                              return (
                                <div className="container-text">
                                  <input
                                    type="text"
                                    placeholder="must be comma(,) separated"
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
                          <label htmlFor="email">Meta Description <span className="req-span">*</span></label>
                          <Field name="meta_description">
                            {({ field, meta }) => {
                              return (
                                <div className="container-text">
                                  <textarea
                                    type="text"
                                    className="form-control"
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
                     <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email">Title <span className="req-span">*</span></label>
                          <Field name="title">
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
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="email">Tag</label>

                          <Field name="tag">
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
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="email">Category <span className="req-span">*</span></label>

                          <Field name="category_id">
                            {({ field, meta }) => {
                              return (
                                <div className="container-text">
                                  <select
                                    type="text"
                                    className="form-control"
                                    {...field}
                                  >
                                      <option value="">Select</option>

                                          {
                                           categories.map(cate => {
                                            return <option key ={cate.category_id} value={cate.category_id}>{cate.title}</option>
                                          })
                                          }


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
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email">Image <span className="req-span">*</span></label>
                          <div className="container-text">
                            <input type="file"
                                className="form-control"
                                onChange={(event) => {
                                    if(event.target.value){
                                        setIsImage(true);
                                    }
                                    console.log(event.target.files[0])
                                    setSelectedFile(event.target.files[0]);
                                }}
                                />
                                {!isImage && (
                                <p className="required">Image is required</p>
                            )}
                            </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email">Description <span className="req-span">*</span></label>

                          <Field name="desc">
                            {({ field, meta }) => {
                              return (
                                <div className="container-text">
                                  <textarea

                                    className="form-control"
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
                        <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email">Stats <span className="req-span">*</span></label>

                          <Field name="status">
                            {({ field, meta }) => {
                              return (
                                <div className="container-text">
                                  <select
                                    className="form-control"
                                    {...field}
                                    >
                                        <option value="">Select</option>
                                        <option value="0">Pending</option>
                                        <option value="1">Active</option>
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
                       
                      <div className="col-md-12">
                        <button
                          onSubmit={handleSubmit}
                          disabled={isSubmitting}
                          type="submit"
                          className="btn btn-primary loginFormBtn tab-btn blog-btn"
                        >
                          {id ? 'Update' :  'Create'}
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
      
      </div>
    </div>
  );
};

export default BlogCreate;
