import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { validate_registerForm as validate } from './../../common/forms/validation';
import { renderTextField } from './../../common/forms/input-types';
import { signupUser } from './../../actions';
import { SIGNUP_SUCCESS, SIGNUP_ERROR } from './../../actions/types';
import { withRouter, Link } from 'react-router-dom';
import asyncValidate from './../../common/forms/asyncValidation/register';
import { Helmet } from 'react-helmet';

class Register extends Component {

    submit(data) {
        const newUser = _.pick(data, ['fName', 'lName', 'email', 'username', 'password'])
        this.props.signupUser(newUser)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signUpStatus) {
            this.props.dispatch({
                type: SIGNUP_SUCCESS,
                payload: false
            });
            this.props.history.push('/login')
        }        
    }

    componentWillUnmount(){
        this.props.dispatch({
            type: SIGNUP_ERROR,
            payload: false
        });
    }

    head() {
        return (
            <Helmet>
                <body className="registerPage" />
                <title>Register - React Starter Kit</title>
            </Helmet>
        );
    }

    render() {
        const { handleSubmit, pristine } = this.props
        return (
            <div>
                {this.head()}
                <div className="auth_wrap">
                    <form onSubmit={handleSubmit(this.submit.bind(this))}>

                        <div className="form_wrap withHeading">

                            <h1>Register</h1>

                            {this.props.signUpErrors &&
                                <div className="error-label">
                                    An error has occurred.
                                </div>
                            }

                            <div className="form_row noLabel">

                                <Field
                                    name="fName"
                                    component={renderTextField}
                                    placeholder="First Name"
                                />

                            </div>

                            <div className="form_row noLabel">

                                <Field
                                    name="lName"
                                    component={renderTextField}
                                    placeholder="Last Name"
                                />

                            </div>

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
                                    name="username"
                                    component={renderTextField}
                                    type="text"
                                    placeholder="Username"
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

                            <div className="form_row noLabel">

                                <Field
                                    name="confirmPassword"
                                    component={renderTextField}
                                    placeholder="Confirm your password"
                                    type="password"
                                />

                            </div>



                        </div>

                        <div className={classNames({ 'form_buttons': true })}>

                            <button disabled={this.props.asyncValidating} className="btn" type="submit">
                                <span>Sign up</span>
                            </button>

                        </div>

                    </form>
                </div>
                <div className="quick_links">
                    <ul>
                        <li>
                            <Link to="/login">
                                Already have an account?
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

Register = reduxForm({
    form: 'RegisterForm',
    validate,
    asyncValidate,
    asyncBlurFields: ['email', 'username']
})(Register);

const mapStateToProps = (state) => {
    return {
        signUpStatus: state.signUp.signUpStatus,
        signUpErrors: state.signUp.signUpErrors
    }
}

export default {
    component: connect(mapStateToProps, { signupUser })(withRouter(Register))
};