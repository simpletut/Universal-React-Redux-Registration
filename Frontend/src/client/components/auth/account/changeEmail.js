import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { validate_changeEmail as validate } from './../../../common/forms/validation';
import { renderTextField } from './../../../common/forms/input-types';
import { changeEmail } from './../../../actions';
import { CHANGE_EMAIL_SUCCESS, CHANGE_EMAIL_ERROR } from './../../../actions/types';
import toastr from 'toastr';
import * as Cookies from 'es-cookie';
import asyncValidate from './../../../common/forms/asyncValidation/changeEmail';
import {get_currentUser} from './../../../actions';

class ChangeEmail extends Component {

    constructor(props) {
        super(props);
    }

    submit(data) {
        let token = Cookies.get('token');
        this.props.changeEmail(token, data);
    }

    componentDidMount() {
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.newEmail) {
            const token = Cookies.get('token');
            this.props.get_currentUser(token);
            toastr.success('We have updated your email.', 'Saved!');
            this.props.reset();
            this.props.dispatch({
                type: CHANGE_EMAIL_SUCCESS,
                payload: false
            });
        }
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: CHANGE_EMAIL_ERROR,
            payload: false
        });
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div className="auth_wrap">
                <form onSubmit={handleSubmit(this.submit.bind(this))}>

                    <div className="form_wrap withHeading">

                        <h1>Change email</h1>

                        {this.props.newEmailErrors &&
                            <div className="error-label">
                                An error has occurred.
                            </div>
                        }

                        {this.props.currentUser &&
                            <p>
                                Current email: {this.props.currentUser.email}
                            </p>
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
                            <span>Change email</span>
                        </button>

                    </div>

                </form>
            </div>
        );
    }

};

ChangeEmail = reduxForm({
    form: 'changeEmailForm',
    validate,
    asyncValidate,
    asyncBlurFields: ['email']
})(ChangeEmail);

const mapStateToProps = (state) => {
    return {
        newEmail: state.account.newEmail,
        newEmailErrors: state.account.newEmailErrors
    }
}

export default connect(mapStateToProps, { changeEmail, get_currentUser })(ChangeEmail)