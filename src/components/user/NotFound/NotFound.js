import React, {Component} from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import notImg from "../../../assets/images/not.PNG"
class NotFound extends Component {
    render() {
        return (
            <>
            <Helmet>
                <title>404 Not Found | Landlordstalk</title>
                <meta name="description" content="404 Not Found | Landlordstalk" />
            </Helmet>
                <section className="main-header-banner not-found">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-md-7">
                                <img src={notImg} className="not-img"/>
                                <h1 className="main-h1-2">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place? </h1>
                                <p className='go-home-p'>Let's go <Link to="/">home</Link> and try from there.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}
export default NotFound;
