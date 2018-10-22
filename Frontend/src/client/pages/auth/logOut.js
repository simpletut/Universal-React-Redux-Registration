import React, { Component } from 'react';
import * as Cookies from 'es-cookie';
import {Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';

class LogOut extends Component {

    componentDidMount() {
        Cookies.remove('token');
    }

    head() {
        return (
            <Helmet>
                <body className="logOutPage" />
                <title>LogOut - React Starter Kit</title>
            </Helmet>
        );
    }

    render() {
        return (
            <div>
                {this.head()}
                <div className="auth_wrap">

                    <div className="form_wrap withHeading logoutWrap">
                        <h1>Logged out</h1>
                        <p className="desc">
                            Please come back soon!
                    </p>
                    </div>

                </div>
                <div className="quick_links">
                    <ul>
                        <li>
                            <Link to="/login">
                                LogIn to your account
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default {
    component: LogOut
}