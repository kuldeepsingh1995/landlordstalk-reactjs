import {React, Component, useState, useEffect, useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import bg1 from "../../../assets/images/Hero Section.png"
import user from "../../../assets/images/avatar.png";
import vid from "../../../assets/images/avatar.png";
import './BlogDetails.css';
import { useHistory, useLocation, useParams } from 'react-router';
import { Link, withRouter } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import{ createAction, ActionNames } from '../../../services';
import { BASE_PATH_BLOGS, BASE_PATH_USERS } from "../../../helpers/UploadDirectory";
import {Helmet} from "react-helmet";

const BlogDetails = () => {
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);
    const dispatch = useDispatch();
    const [Blog, setBlog] = useState(false);
    let { slug } = useParams();        
    const history = useHistory()
    const location  =  useLocation();
    const searchBlog = useCallback(async () => {
        try {
            const postData = {slug: slug}
            const fetching = createAction(ActionNames.BLOG_DETAIL_API, postData);
            const resp_data = fetching.payload;
            resp_data.then((resp) => {
                setBlog(resp.data.data);
                console.log(resp)
            })
            

        } catch (e) {
            console.log(e);
        }
        });

        useEffect(() => {
             searchBlog()

        }, [location.pathname]);
       
    // let blogDetail =   {
    //         blog_id: 1,
    //         title: 'Amazing Lands For Sale In America.',
    //         tag: 'TRAVEL',
    //         image: "/static/media/Image.b81be831.png",
    //         desc: 'For Some Reason — This Country, This City, This Neighborhood, This Particular Street —  Is The Place You Are Living A Majority Of Your Life In.',
    //         ago: '2 min',
    //         slug: 'single-blog',
    //         created_by: {
    //             name:'Steven Voorhees',
    //             image: vid
    //         },
    //         next_blog: {
    //             blog_id: 1,
    //             title: 'Morbi Eleifend A Libero',
    //             short_desc: 'Quisque Viverra Interdum Velit, Et Cursus Magna Sagittis In. In Dui Dui.',
    //             slug: 'single-blog-next'
    //         },
    //         comments: [
    //             {
    //                 comment: 'In Hac Habitasse Platea Dictumst. Sed Nec Venenatis Odio. Nulla Faucibus Ipsum Sed Faucibus Accumsan. Donec Rhoncus Luctus Massa Vitae Lobortis. Duis Consequat, Nunc A Pretium Imperdiet, Neque Est Rhoncus Massa, Tristique Rutrum Nisl Risus At Libero.',
    //                 ago: '2 Min Ago',
    //                 created_by: {
    //                     name:'Jonathan Walker',
    //                     image: user
    //                 }
    //             },
    //             {
    //                 comment: 'In Hac Habitasse Platea Dictumst. Sed Nec Venenatis Odio. Nulla Faucibus Ipsum Sed Faucibus Accumsan. Donec Rhoncus Luctus Massa Vitae Lobortis. Duis Consequat, Nunc A Pretium Imperdiet, Neque Est Rhoncus Massa, Tristique Rutrum Nisl Risus At Libero.',
    //                 ago: '2 Min Ago',
    //                 created_by: {
    //                     name:'Jonathan Walker 2',
    //                     image: user
    //                 }
    //             }
    //         ]
    //     };
        
        const { isLoggedIn, user_obj } = useSelector((state) => {
            return {
              isLoggedIn: state.authentication.user?.loggedIn,
              user_obj: state.authentication.user?.user_obj,
            };
        });

        const openNextBlog = (nextBlogLink) => {
            history.push('/user/blog/'+ nextBlogLink);
        }
         return (
            Blog && 
                <>
                {
                    (Blog.meta_title!='') && (
                        <Helmet>
                            <title>{ Blog.meta_title }</title>
                            <meta name="description" content={ Blog.meta_description } />
                            <meta name="keywords" content={ Blog.meta_keywords } />
                        </Helmet>
                    )
                }
                 
                    <section className="blog-detail-section" style={{ backgroundImage: 'url('+((Blog.blog_id > 22) ? BASE_PATH_BLOGS + Blog.image : Blog.image) +')'}}>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="main-blog-header">
                                        <h3>{Blog.title}</h3>
                                        <div className="tag-div">
                                            <p><i className='bx bx-globe'></i> LAND GUIDE</p>
                                            <p><i className='bx bxs-detail'></i> LANDLORD NEWS</p>
                                        </div>
                                        <div className="blog-by-div">
                                            <div className="profile-div">
                                            <img src={Blog.created_by ? ( Blog.created_by.image!=null ?  BASE_PATH_USERS+Blog.created_by.image : user) : user} />
                                                
                                                <p>by {Blog.created_by.name}</p>
                                            </div>
                                        </div>
                                        {
                                            (Blog.next_blog) && (
                                                <div style={{cursor: 'pointer'}} className="next-post-div" onClick={() => {openNextBlog(Blog.next_blog.slug)}}>
                                                    <Link className="next-nav"><i className='bx bx-chevron-right'></i></Link>
                                                    <p className="main-next-heading">NEXT POST</p>
                                                    <p className="first-cap main-next-sub-heading">{Blog.next_blog.title}</p>
                                                    <p className=" first-cap main-next-para">{Blog.next_blog.short_desc}</p>
                                                </div>
                                            )
                                        }
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="blog-detail-info">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 s-col-blog">
                                    <h3 className={"first-cap"}>{Blog.title}</h3>
                                    <p className={"first-cap"}>{ Blog.desc }</p>
                                    {/* <img src={vid} className="blog-info-img"/> */}
                                    <div className="user-info">
                                        {/* <h3>Small Title - Subtitle</h3> */}
                                        <p className={"first-cap"}><i className='bx bx-time-five'></i> {Blog.ago}</p>
                                    </div>
                                    <hr />
                                    <h3>Leave a comment</h3>
                                    {
                                        isLoggedIn ? (
                                    <Formik
                                        initialValues={{
                                            comment: "",
                                        }}
                                        validationSchema={Yup.object().shape({
                                            comment: Yup.string().required("Comment is Required"),
                                        })}
                                        validate={(values) => {
                                            const errors = {};
                                            
                                            return errors;
                                        }}
                                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                                            try {
                                                values.blog_id = Blog.id
                                                console.log(values, 'values')
                                            const result= await createAction(ActionNames.BLOG_COMMENT_ADD, {
                                                ...values
                                            });
                                            result.payload.then(res => {
                                                const data = res.data;
                                                setBlog(prevBlog => {
                                                    const prevBlogData = {...prevBlog};
                                                    prevBlogData.comments = prevBlogData.comments.concat(data.data);
                                                    return prevBlogData;
                                                });
                                                if(data.status=='success'){
                                                setSuccessMessage(data.message);
                                                resetForm()
                                                } else if(data.status=='fail'){
                                                    setErrorMessages(data.errors);
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
                                            /* and other goodies */
                                        }) => (
                                            <form onSubmit={handleSubmit} className="loginForm" id="loginFomr">
                                            <div className="row">
                                                <div className="col-md-10">
                                                <div className="form-group">
                                                    <label htmlFor="comment">Comment:</label>
                                                    <Field name="comment">
                                                    {({ field, meta }) => {
                                                        return (
                                                        <div className="container-text">
                                                            <textarea
                                                            type="text"
                                                            rows="8"
                                                            className="form-control"
                                                            {...field}
                                                            >
                                                            </textarea>
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
                                            { successMessage && <h3 className="alert alert-success"> { successMessage } </h3> }
                                            { errorMessages.map(error => (
                                                <h3 className="alert alert-danger"> { error } </h3>
                                                )) }
                                            <div className="row">
                                                <div className="col-md-6">
                                                <button
                                                    onSubmit={handleSubmit}
                                                    disabled={isSubmitting}
                                                    type="submit"
                                                    className="btn btn-primary loginFormBtn"
                                                >
                                                    ADD COMMENT
                                                </button>
                                                </div>
                                            </div>
                                            </form>
                                        )}
                                        </Formik>
                                        ) : <p className="note-p">
                                        Are you a landlord? <Link to="/user/signup">Sign Up</Link> to leave a
                                        comment
                                    </p>
                                    }
                                </div>
                                <div className="col-lg-4">
                                    <div className="commnet-div">
                                        <h3>Comments</h3>
                                        {
                                            (Blog.comments.length > 0) ? (
                                                Blog.comments.map(comment => (
                                                    <div className="comment">
                                                        <div className="profile-div">
                                                             <img src={comment.created_by ? ( comment.created_by.profile_photo!=null ?  BASE_PATH_USERS+comment.created_by.profile_photo : user) : user} />
                                                            <p className="all-caps">{comment.created_by ? (comment.created_by.fname+' '+comment.created_by.lname) : 'USER' } </p>
                                                        </div>
                                                        <p style={{whiteSpace: 'pre-line'}}>{comment.comment}</p>
                                                        <p className="first-cap commnet-time"><i className='bx bx-time-five'></i> {comment.ago}</p>
                                                    </div>
                                                ))
                                            ) : 'No comments'
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                </>
        );
    }
BlogDetails.propTypes = {};
export default BlogDetails;
