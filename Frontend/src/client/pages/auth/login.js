import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { validate_logInForm as validate } from './../../common/forms/validation';
import { renderTextField } from './../../common/forms/input-types';
import { loginUser } from './../../actions';
import { AUTH_ERROR } from './../../actions/types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

class Login extends Component {

    submit(data) {
        this.props.loginUser(data)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.authStatus == true) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillUnmount(){
        this.props.dispatch({
            type: AUTH_ERROR,
            payload: false
        });
    }

    head() {
        return (
            <Helmet>
                <body className="logInPage" />
                <title>LogIn - React Starter Kit</title>
            </Helmet>
        );
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div>
                {this.head()}
                <div className="auth_wrap">
                    <form onSubmit={handleSubmit(this.submit.bind(this))}>

                        <div className="form_wrap withHeading">

                            <h1>LogIn</h1>

                            {this.props.authErrors &&
                                <div className="error-label">
                                    An error has occurred.
                                </div>
                            }


                            <div className="form_row noLabel">

                                <Field
                                    name="email"
                                    component={renderTextField}
                                    type="email"
                                    placeholder="Email"
                                />

                            </div>

                            <div className="form_row noLabel">

                                <Field
                                    name="password"
                                    component={renderTextField}
                                    placeholder="Create your password"
                                    type="password"
                                />

                            </div>

                        </div>

                        <div className={classNames({ 'form_buttons': true })}>

                            <button className="btn" type="submit">
                                <span>LogIn</span>
                            </button>

                        </div>

                    </form>
                </div>
                <div className="quick_links">
                    <ul>
                        <li>
                            <Link to="/register">
                                Don't have an account?
                            </Link>
                        </li>
                        <li>
                            <Link to="/reset">
                                Forgot your password?
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

};

Login = reduxForm({
    form: 'LogInForm',
    validate
})(Login);

const mapStateToProps = (state) => {
    return {
        authStatus: state.authStatus.status,
        authErrors: state.authStatus.errors
    }
}

export default {
    component: connect(mapStateToProps, { loginUser })(Login)
};