import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { validate_changePassword as validate } from './../../../common/forms/validation';
import { renderTextField } from './../../../common/forms/input-types';
import { changePassword } from './../../../actions';
import {NEW_PASSWORD_SUCCESS, NEW_PASSWORD_ERROR} from './../../../actions/types';
import _ from 'lodash';
import toastr from 'toastr';
import * as Cookies from 'es-cookie';

class ChangePassword extends Component {

    submit(data) {
        let token = Cookies.get('token');
        this.props.changePassword(token, _.pick(data, ['password']));
    }

    componentDidMount(){
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.newPassword){
            toastr.success('We have updated your password.', 'Saved!');
            this.props.reset();
            this.props.dispatch({
                type: NEW_PASSWORD_SUCCESS,
                payload: false
            });
        }
    }

    componentWillUnmount(){
        this.props.dispatch({
            type: NEW_PASSWORD_ERROR,
            payload: false
        });
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div className="auth_wrap">
                <form onSubmit={handleSubmit(this.submit.bind(this))}>

                    <div className="form_wrap withHeading">

                        <h1>Change password</h1>

                        {this.props.newPasswordErrors &&
                            <div className="error-label">
                                An error has occurred.
                            </div>
                        }

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

                        <button className="btn" type="submit">
                            <span>Reset Password</span>
                        </button>

                    </div>

                </form>
            </div>
        );
    }

};

ChangePassword = reduxForm({
    form: 'changePasswordForm',
    validate
})(ChangePassword);

const mapStateToProps = (state) => {
    return {
        newPassword: state.account.newPassword,
        newPasswordErrors: state.account.newPasswordErrors
    }
}

export default connect(mapStateToProps, {changePassword})(ChangePassword)