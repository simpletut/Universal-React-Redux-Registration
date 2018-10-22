import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { validate_reset as validate } from './../../common/forms/validation';
import { renderTextField } from './../../common/forms/input-types';
import {Link, withRouter} from 'react-router-dom';
import { resetPassword } from './../../actions';
import { RESET_PW_SUCCESS, RESET_PW_ERROR } from './../../actions/types';
import asyncValidate from './../../common/forms/asyncValidation/reset';
import { Helmet } from 'react-helmet';

class Reset extends Component {

    submit(data) {
        this.props.resetPassword(data);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.resetPasswordStatus){
            this.props.dispatch({
                type: RESET_PW_SUCCESS,
                payload: false
            });
            this.props.history.push('/login');
        }
    }

    componentWillUnmount(){
        this.props.dispatch({
            type: RESET_PW_ERROR,
            payload: false
        });
    }

    head() {
        return (
            <Helmet>
                <body className="resetPage" />
                <title>Reset - React Starter Kit</title>
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

                            <h1>Account Recovery</h1>

                            {this.props.resetPasswordErrors &&
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

                        </div>

                        <div className={classNames({ 'form_buttons': true })}>

                            <button disabled={this.props.asyncValidating} className="btn" type="submit">
                                <span>Recover my account</span>
                            </button>

                        </div>

                    </form>
                </div>
                <div className="quick_links">
                    <ul>
                        <li>
                            <Link to="/login">
                                Remembered your login details?
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

};

Reset = reduxForm({
    form: 'ResetForm',
    validate,
    asyncValidate,
    asyncBlurFields: ['email']
})(Reset);

const mapStateToProps = (state) => {
    return {
        resetPasswordStatus: state.account.resetPassword,
        resetPasswordErrors: state.account.resetPasswordErrors
    }
};

export default {
    component: connect(mapStateToProps, {resetPassword})(withRouter(Reset))
};