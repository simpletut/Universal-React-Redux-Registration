import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_currentUser } from './../../actions';
import * as Cookies from 'es-cookie';
import ChangeEmail from './../../components/auth/account/changeEmail';
import ChangePassword from './../../components/auth/account/changePassword';
import { Helmet } from 'react-helmet';

class Account extends Component {

    componentDidMount() {
        const token = Cookies.get('token');
        if(!this.props.isUnitTest) this.props.get_currentUser(token);
    }

    head() {
        return (
            <Helmet>
                <body className="accountPage" />
                <title>Account - React Starter Kit</title>
            </Helmet>
        );
    }

    render() {
        return (
            <div className="accountWrap">
                {this.head()}
                <ChangeEmail currentUser={this.props.currentUser} />
                <ChangePassword />
            </div>
        );
    }

};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default {
    component: connect(mapStateToProps, { get_currentUser })(Account),
    loadData: ({ dispatch }) => dispatch(get_currentUser('noToken'))
};