import {React, Component, useState, useEffect, useCallback} from "react";
import {useHistory} from 'react-router-dom';
import bg1 from "../../../assets/images/Image.png"
import './Blog.css';
import {ActionNames, createAction} from "../../../services";
import {BASE_PATH_BLOGS} from "../../../helpers/UploadDirectory";
import {Helmet} from "react-helmet";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation} from 'swiper';
import 'swiper/swiper.min.css';

import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';

SwiperCore.use([Navigation]);

const Blog = (props) => {
	const [BlogList, setBlogs] = useState([]);
	//  setTimeout(() => {
	//     var triendingCraousel  = document.getElementById('trending');
	//     triendingCraousel.bind('slide.bs.carousel', function (e) {
	//         console.log('slide event!');
	//     });
	//  }, 1000);
	
	const searchBlogs = useCallback(async () => {
		
		try {
			const fetching = createAction(ActionNames.BLOG_LIST);
			const resp_data = fetching.payload;
			resp_data.then((resp) => {
				setBlogs(resp.data.data);
			})
			
			
		} catch (e) {
			console.log(e);
		}
	});
	
	useEffect(() => {
		searchBlogs()
		
	}, []);
	console.log(BlogList, 'BlogList')
	
	const history = useHistory();
	
	// const BlogList = [
	//     {
	//         style: 'style_1',
	//         category_id: 1,
	//         title: 'LANDLORD NEWS',
	//         blogs: [
	//             {
	//                 blog_id: 1,
	//                 title: 'Amazing Lands For Sale In America.',
	//                 tag: 'TRAVEL',
	//                 image: "/static/media/Image.b81be831.png",
	//                 desc: 'For Some Reason — This Country, This City, This Neighborhood, This Particular Street —  Is The Place You Are Living A Majority Of Your Life In.',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 2,
	//                 title: 'Article Title',
	//                 tag: 'TECHNOLOGY',
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 3,
	//                 title: 'Article Title',
	//                 tag: 'TRAVEL',
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 4,
	//                 title: 'Article Title',
	//                 tag: 'TECHNOLOGY',
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 5,
	//                 title: 'Article Title',
	//                 tag: 'TECHNOLOGY',
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             }
	//             ,
	//             {
	//                 blog_id: 6,
	//                 title: 'Article Title',
	//                 tag: 'TECHNOLOGY',
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             }
	
	//         ]
	//     },
	//     {
	//         style: 'style_2',
	//         category_id: 2,
	//         title: 'TRENDING',
	//         blogs: [
	//             {
	//                 blog_id: 1,
	//                 title: 'Dolore Magna Aliqua.',
	//                 tag: '',
	//                 image: "/static/media/vch.6e9e1708.png",
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 2,
	//                 title: 'Morbi Eleifend A Libero',
	//                 tag: '',
	//                 image: '/static/media/annie-spratt-216507-unsplash.ee52d1fe.png',
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…                    ',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 3,
	//                 image: "/static/media/carlos-hevia-628890-unsplash.dac27e1d.png",
	//                 title: 'Morbi Eleifend A Libero',
	//                 tag: '',
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 4,
	//                 title: 'Dolore Magna Aliqua.',
	//                 tag: '',
	//                 image: "/static/media/vch.6e9e1708.png",
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 5,
	//                 title: 'Morbi Eleifend A Libero',
	//                 tag: '',
	//                 image: '/static/media/annie-spratt-216507-unsplash.ee52d1fe.png',
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…                    ',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	
	//         ]
	//     },
	//     {
	//         style: 'style_3',
	//         category_id: 3,
	//         title: 'HAPPENING NOW',
	//         blogs: [
	//             {
	//                 blog_id: 1,
	//                 title: 'Large Article Title.',
	//                 tag: '',
	//                 image: "/static/media/drhyt.28c328ab.png",
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, In Eam Odio Amet, Vix Id Nullam Detracto, Vidit Vituperatoribus Duo Id. Affert Detraxit Voluptatum Vis Eu, Inermis Eloquentiam.',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 2,
	//                 title: 'Large Article Title.',
	//                 tag: '',
	//                 image: "/static/media/tu.e5479781.png",
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, In Eam Odio Amet, Vix Id Nullam Detracto, Vidit Vituperatoribus Duo Id. Affert Detraxit Voluptatum Vis Eu, Inermis Eloquentiam.',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 3,
	//                 image: "/static/media/161975_1024x768.26040944.png",
	//                 title: 'Small Title',
	//                 tag: '',
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…',
	//                 ago: '3 min ago by landlords',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 4,
	//                 image: "/static/media/roberto-nickson-g-744100-unsplash.7603533d.png",
	//                 title: 'Small Title',
	//                 tag: '',
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…',
	//                 ago: '3 min ago by landlords',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 5,
	//                 image: "/static/media/tom-mussak-108425-unsplash.dc3028d8.png",
	//                 title: 'Morbi Eleifend A Libero',
	//                 tag: '',
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 6,
	//                 title: 'Large Article Title.',
	//                 tag: '',
	//                 image: "/static/media/drhyt.28c328ab.png",
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, In Eam Odio Amet, Vix Id Nullam Detracto, Vidit Vituperatoribus Duo Id. Affert Detraxit Voluptatum Vis Eu, Inermis Eloquentiam.',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 7,
	//                 title: 'Large Article Title.',
	//                 tag: '',
	//                 image: "/static/media/tu.e5479781.png",
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, In Eam Odio Amet, Vix Id Nullam Detracto, Vidit Vituperatoribus Duo Id. Affert Detraxit Voluptatum Vis Eu, Inermis Eloquentiam.',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 8,
	//                 image: "/static/media/161975_1024x768.26040944.png",
	//                 title: 'Small Title',
	//                 tag: '',
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…',
	//                 ago: '3 min ago by landlords',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 9,
	//                 image: "/static/media/roberto-nickson-g-744100-unsplash.7603533d.png",
	//                 title: 'Small Title',
	//                 tag: '',
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…',
	//                 ago: '3 min ago by landlords',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 10,
	//                 image: "/static/media/tom-mussak-108425-unsplash.dc3028d8.png",
	//                 title: 'Morbi Eleifend A Libero',
	//                 tag: '',
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	//             {
	//                 blog_id: 11,
	//                 image: "/static/media/tom-mussak-108425-unsplash.dc3028d8.png",
	//                 title: 'Morbi Eleifend A Libero',
	//                 tag: '',
	//                 desc: 'Lorem Ipsum Dolor Sit Amet, Ipsum Labitur Lucilius Mel Id, Ad Has Appareat…',
	//                 ago: '2 min',
	//                 slug: 'single-blog'
	//             },
	//         ]
	//     }
	// ];
	return (
		<>
			<Helmet>
				<title>Blogs | Landlordstalk</title>
				<meta name="description" content="Blogs | Landlordstalk"/>
			</Helmet>
			{(!BlogList.length) && <div className="no_records_error"><p>No Blog found.</p></div>}
			{BlogList.map(blogCat => {
				
				if (blogCat.style == 'style_1' && blogCat.blogs.length > 0) {
					
					let divide_2 = ((blogCat.blogs.length - 1) / 2);
					
					return (
						<section className="blog-header-section">
							<div className="container-fluid">
								<div className="row">
									{
										(
											(blogCat.blogs[0]) ? (
												<div className="col-md-12 col-lg-7 col-xl-8">
													<div className="blog-header-div">
														<img
															src={blogCat.blogs[0].blog_id > 22 ? BASE_PATH_BLOGS + blogCat.blogs[0].image : bg1}/>
														<div className="content-blog-div">
															<div className="content-blog container">
																<h3>{blogCat.title}</h3>
																<hr/>
																<h3>{blogCat.blogs[0].title}</h3>
																<p>{blogCat.blogs[0].desc}</p>
																<button type="button" onClick={() => {
																	history.push('/user/blog/' + blogCat.blogs[0].slug)
																}} className="read-more">LEARN MORE
																</button>
															</div>
														
														</div>
													</div>
												</div>
											) : ''
										)
									}
									
									<div className="col-md-12 col-lg-5 col-xl-4">
										
										<div id="demo" className="container carousel slide" data-ride="carousel">
											<div className="side-blog-heading">
												<h3>MORE <span>NEWS</span></h3>
												<div className="control-div">
													<a className="carousel-control-prev" href="#demo" data-slide="prev">
														<span className="carousel-control-prev-icon"></span>
													</a>
													<a className="carousel-control-next" href="#demo" data-slide="next">
														<span className="carousel-control-next-icon"></span>
													</a>
												</div>
											</div>
											
											
											<div className="carousel-inner">
												{blogCat.blogs.map((obj, p_i) => (
														p_i <= divide_2 ?
															<div className={'carousel-item' + (p_i == 0 ? ' active' : '')}>
																<div className="blog-side-div-wrap">
																	{blogCat.blogs.slice(1).map((obj_blog, i) => (
																		((i >= p_i * 2 && i <= ((p_i * 2) + 1)) ?
																			(
																				<div className="blog-side-div">
																					<h3>{obj_blog.tag} </h3>
																					<h4 className="first-cap"
																						onClick={() => {
																							history.push('/user/blog/' + obj_blog.slug)
																						}}>{(obj_blog.title.length > 35 ? obj_blog.title.slice(0, 35) + '..' : obj_blog.title)}</h4>
																					<p className="first-cap">{(obj_blog.desc.length > 35 ? obj_blog.desc.slice(0, 35) + '..' : obj_blog.desc)}</p>
																					<p className="blog-time first-cap"><i
																						className='bx bx-time-five'></i> {obj_blog.ago}
																					</p>
																				</div>
																			
																			)
																			: '')
																	
																	))}
																</div>
															</div>
															: ''
													)
												)
												}
											
											
											</div>
										
										
										</div>
									</div>
								</div>
							</div>
						</section>
					)
				}
			})
			}
			
			<section className="blog-list-section">
				<div className="container">
					{
						BlogList.map(blogCat => {
							if (blogCat.style == 'style_2' && blogCat.blogs.length > 0) {
								
								let divide_3 = blogCat.blogs.length / 3;
								return (
									<div id="trending" className="carousel slide" data-ride="carousel">
										<div className="side-blog-heading">
											<h3>{blogCat.title}</h3>
											<div className="control-div">
												<a className="carousel-control-prev" href="#trending"
												   data-slide="prev">
													<span className="carousel-control-prev-icon"></span>
												</a>
												<a className="carousel-control-next" href="#trending"
												   data-slide="next">
													<span className="carousel-control-next-icon"></span>
												</a>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<Swiper
													spaceBetween={30}
													slidesPerView={1}
													onSlideChange={() => console.log('slide change')}
													onSwiper={(swiper) => console.log(swiper)}
													navigation
													breakpoints={{
														640: {
															width: 640,
															slidesPerView: 1,
														},
														768: {
															width: 768,
															slidesPerView: 2,
														}
													}}
												>
													{blogCat.blogs.map((obj_blog, p_i) => (
														<SwiperSlide>
															<div onClick={() => {
																history.push('/user/blog/' + obj_blog.slug)
															}} className="t-blog">
																<div className="blog-card">
																	<img
																		src={obj_blog.blog_id > 22 ? BASE_PATH_BLOGS + obj_blog.image : obj_blog.image}/>
																	<div className="blog-side-div">
																		<h4 className="first-cap">{(obj_blog.title.length > 35 ? obj_blog.title.slice(0, 35) + '..' : obj_blog.title)}</h4>
																		<p className="first-cap">{(obj_blog.desc.length > 35 ? obj_blog.desc.slice(0, 35) + '..' : obj_blog.desc)}</p>
																		<p className="blog-time first-cap"><i
																			className='bx bx-time-five'></i>{obj_blog.ago}
																		</p>
																	</div>
																</div>
															</div>
														</SwiperSlide>
													))
													}
												</Swiper>
											
											</div>
										</div>
									</div>
								
								)
							}
						})
					}
					
					{
						BlogList.map(blogCat => {
							
							if (blogCat.style == 'style_3' && blogCat.blogs.length > 0) {
								
								let divide_5 = blogCat.blogs.length / 5;
								
								return <div className="row mt-3 slide-row">
									<div className="col-md-12 ">
										<div id="side" className="carousel slide" data-ride="carousel">
											<div className="side-blog-heading">
												<h3>{blogCat.title}
													{/* <span>NOW</span> icon-disabled*/}
												</h3>
												<div className="control-div">
													<a className="carousel-control-prev" href="#side"
													   data-slide="prev">
														<span className="carousel-control-prev-icon"></span>
													</a>
													<a className="carousel-control-next" href="#side"
													   data-slide="next">
														<span className="carousel-control-next-icon"></span>
													</a>
												</div>
											</div>
											
											
											<div className="carousel-inner hide-mb">
												{blogCat.blogs.map((obj, p_i) => {
													if (p_i <= divide_5) {
														let newBlogList = blogCat.blogs.slice(p_i * 5, (p_i + 1) * 5);
														return newBlogList.length > 0 &&
															(
																<div
																	className={'carousel-item' + (p_i == 0 ? ' active' : '')}>
																	<div className="row">
																		<div className="col-md-8">
																			
																			{
																				(newBlogList[0]) &&
																				(
																					<div onClick={() => {
																						history.push('/user/blog/' + newBlogList[0].slug)
																					}}
																						 className="img-blog-card">
																						<img
																							src={newBlogList[0].blog_id > 22 ? BASE_PATH_BLOGS + newBlogList[0].image : newBlogList[0].image}/>
																						<div
																							className="img-blog-div">
																							<h3 className="first-cap">{(newBlogList[0].title.length > 35 ? newBlogList[0].title.slice(0, 35) + '..' : newBlogList[0].title)}</h3>
																							<p className={"first-cap"}>{(newBlogList[0].desc.length > 35 ? newBlogList[0].desc.slice(0, 35) + '..' : newBlogList[0].desc)}</p>
																							<p className="img-blog-time first-cap">
																								<i className='bx bx-time-five'></i> {newBlogList[0].ago}
																							</p>
																						</div>
																					</div>
																				)
																			}
																			{
																				(newBlogList[1]) &&
																				(
																					<div onClick={() => {
																						history.push('/user/blog/' + newBlogList[1].slug)
																					}}
																						 className="img-blog-card">
																						<img
																							src={newBlogList[1].blog_id > 22 ? BASE_PATH_BLOGS + newBlogList[1].image : newBlogList[1].image}/>
																						<div
																							className="img-blog-div">
																							<h3 className="first-cap">{(newBlogList[1].title.length > 35 ? newBlogList[1].title.slice(0, 35) + '..' : newBlogList[1].title)}</h3>
																							<p className="first-cap">{(newBlogList[1].desc.length > 35 ? newBlogList[1].desc.slice(0, 35) + '..' : newBlogList[1].desc)}</p>
																							<p className="img-blog-time first-cap">
																								<i className='bx bx-time-five'></i> {newBlogList[1].ago}
																							</p>
																						</div>
																					</div>
																				)
																			}
																		</div>
																		<div className="col-md-4">
																			<div className="row">
																				{
																					(newBlogList[2]) &&
																					(
																						<div onClick={() => {
																							history.push('/user/blog/' + newBlogList[2].slug)
																						}}
																							 className="col-md-12 col-sm-6">
																							<div
																								className="blog-card blog-card-side">
																								<img
																									src={newBlogList[2].blog_id > 22 ? BASE_PATH_BLOGS + newBlogList[2].image : newBlogList[2].image}/>
																								<div
																									className="blog-side-div">
																									<h4 className="first-cap"> {(newBlogList[2].title.length > 35 ? newBlogList[2].title.slice(0, 35) + '..' : newBlogList[2].title)}</h4>
																									<p className="blog-time first-cap">
																										<i className='bx bx-time-five'></i> {newBlogList[2].ago}
																									</p>
																								</div>
																							</div>
																						</div>
																					)
																				}
																				{(newBlogList[3]) &&
																				(
																					<div onClick={() => {
																						history.push('/user/blog/' + newBlogList[3].slug)
																					}}
																						 className="col-md-12 col-sm-6">
																						<div
																							className="blog-card blog-card-side">
																							<img
																								src={newBlogList[3].blog_id > 22 ? BASE_PATH_BLOGS + newBlogList[3].image : newBlogList[3].image}/>
																							<div
																								className="blog-side-div">
																								<h4 className="first-cap">{(newBlogList[3].title.length > 35 ? newBlogList[3].title.slice(0, 35) + '..' : newBlogList[3].title)}</h4>
																								<p className="blog-time first-cap">
																									<i className='bx bx-time-five'></i> {newBlogList[3].ago}
																								</p>
																							</div>
																						</div>
																					</div>
																				)
																				}{
																				(newBlogList[4]) &&
																				(
																					<div onClick={() => {
																						history.push('/user/blog/' + newBlogList[4].slug)
																					}}
																						 className="col-md-12 col-sm-6">
																						<div
																							className="blog-card blog-card-side">
																							<img
																								src={newBlogList[4].blog_id > 22 ? BASE_PATH_BLOGS + newBlogList[4].image : newBlogList[4].image}/>
																							<div
																								className="blog-side-div">
																								<h4 className="first-cap">{(newBlogList[4].title.length > 35 ? newBlogList[4].title.slice(0, 35) + '..' : newBlogList[4].title)}</h4>
																								<p className="blog-time first-cap">
																									<i className='bx bx-time-five'></i> {newBlogList[4].ago}
																								</p>
																							</div>
																						</div>
																					</div>
																				)
																			}
																			</div>
																		
																		</div>
																	</div>
																</div>
															);
													} else {
														return ''
													}
													
												})}
											
											
											</div>
										</div>
									</div>
									<div className="col-md-12 show-mb">
										<Swiper
											spaceBetween={30}
											slidesPerView={1}
											onSlideChange={() => console.log('slide change')}
											onSwiper={(swiper) => console.log(swiper)}
											navigation
											breakpoints={{
												640: {
													width: 640,
													slidesPerView: 1,
												},
												768: {
													width: 768,
													slidesPerView: 2,
												}
											}}
										>
											{blogCat.blogs.map((obj_blog, p_i) => (
												<SwiperSlide>
													<div onClick={() => {
														history.push('/user/blog/' + obj_blog.slug)
													}} className="t-blog">
														<div className="blog-card">
															<img src={obj_blog.blog_id > 22 ? BASE_PATH_BLOGS + obj_blog.image : obj_blog.image}/>
															<div className="blog-side-div">
																<h4 className="first-cap">{(obj_blog.title.length > 35 ? obj_blog.title.slice(0, 35) + '..' : obj_blog.title)}</h4>
																<p className="first-cap">{(obj_blog.desc.length > 35 ? obj_blog.desc.slice(0, 35) + '..' : obj_blog.desc)}</p>
																<p className="blog-time first-cap"><i
																	className='bx bx-time-five'></i>{obj_blog.ago}
																</p>
															</div>
														</div>
													</div>
												</SwiperSlide>
											))
											}
										</Swiper>
									
									</div>
								
								</div>
								
							}
						})
					}
				</div>
			</section>
		</>
	);
}


Blog.propTypes = {};

export default Blog;
