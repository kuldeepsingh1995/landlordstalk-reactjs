import React, {Component} from 'react';
import PropTypes from 'prop-types';
import img1 from "../../../assets/images/1.PNG"
import img2 from "../../../assets/images/2.PNG"
import img3 from "../../../assets/images/3.PNG"
import img4 from "../../../assets/images/4.PNG"
import img5 from "../../../assets/images/5.PNG"
import logoLight from "../../../assets/images/logo-light.png"
import './About.css';
import ReadyToReview from '../ReadyToReview';
import { Helmet } from 'react-helmet';
class About extends Component {
    state={
        darkBg:false
    }
    render() {
        return (
            <>
                <Helmet>
                    <title>About us | Landlordstalk</title>
                    <meta name="description" content="About us | Landlordstalk" />
                </Helmet>
                <section className="doesSection">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="does-h"><span>What</span> is?</h3>
                                <img className="sec-logo-img-2" src={logoLight} />
                                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sodales primis, mollis viverra conubia ligula inceptos laoreet libero tortor, nascetur non habitasse iaculis tempor nec egestas fames augue, platea porta integer nostra curae sed arcu. Nec ut diam vulputate ante scelerisque ridiculus lobortis orci mi curae himenaeos quis, senectus curabitur ullamcorper a porttitor nibh fermentum nisi cum morbi aliquam. Vitae pretium vestibulum dui gravida in potenti interdum, class rhoncus neque.</p>
                                <p> Ullamcorper Porttitor Non Pharetra Cursus Nisl Mollis Pellentesque Primis Penatibus Platea, Dictum Himenaeos Eget Mi Bibendum Ad Molestie Aliquet Curae Quis Quisque, Nunc Duis Ac At Elementum Dui Integer Viverra Tempus. Lacinia Bibendum Diam Senectus Egestas Nec Molestie Convallis Aenean Hac Tempus, Vivamus Purus Congue Euismod Fringilla Cursus Donec Est Eu Blandit Platea, Feugiat Vitae Netus Orci Habitant Accumsan Placerat Morbi Nostra. Quam Fringilla Sociis Suspendisse Quis Ultricies Dis Tellus Cum, Litora Aliquet.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="howItWorks">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3 className="section-h3">How It <span>Works</span></h3>
                                <div className="how">
                                    <div className="howItem">
                                        <img src={img1}/>
                                        <div className="howInfo">
                                            <h3>sign up</h3>
                                            <p>Create your account</p>
                                        </div>
                                    </div>
                                    <div className="howItem">
                                        <img src={img2}/>
                                        <div className="howInfo">
                                            <h3>Review</h3>
                                            <p>Fill a form to review<br/>your tentant</p>
                                        </div>
                                    </div>
                                    <div className="howItem">
                                        <img src={img3}/>
                                        <div className="howInfo">
                                            <h3>share</h3>
                                            <p>Share it with other<br/>landlords</p>
                                        </div>
                                    </div>
                                    <div className="howItem">
                                        <img src={img4}/>
                                        <div className="howInfo">
                                            <h3>search</h3>
                                            <p>Search for a tentant<br/>review</p>
                                        </div>
                                    </div>
                                    <div className="howItem">
                                        <img src={img5}/>
                                        <div className="howInfo">
                                            <h3>find</h3>
                                            <p>Find reviews for your<br/>desire tentant</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <ReadyToReview></ReadyToReview>
            </>
        );
    }
}
About.propTypes = {};
export default About;
