import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';

class NotFound extends Component {

    head() {
        return (
            <Helmet>
                <body className="notFoundPage" />
                <title>Not Found 404 - React Starter Kit</title>
            </Helmet>
        );
    }

    render() {
        return (
            <div>
                {this.head()}
                <div className="auth_wrap">

                    <div className="form_wrap withHeading logoutWrap">
                        <h1>404. PAGE NOT FOUND.</h1>
                        <p className="desc">
                        We're sorry. The page you requested can not be found. Please try one of the links below.
                    </p>
                    </div>

                </div>
                <div className="quick_links">
                    <ul>
                        <li>
                            <Link to="/dashboard">
                                Your account
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default {
    component: NotFound
}