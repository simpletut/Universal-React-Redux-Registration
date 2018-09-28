import React, {Component} from 'react';
import RoutesHelper from './../routes/routesHelper';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getAuthStatus, checkAuthStatus, force_noAuthStatus} from './../actions';
import * as Cookies from 'es-cookie';

import Header from './../components/header';
import Footer from './../components/footer';

class Main extends Component {

    constructor(props){
        super(props);
        this.state = {
            site_loaded: false
        }
    }

    componentDidMount(){
        this.setState({
            site_loaded: true
        });

        let token = Cookies.get('token');
        if(token){
            this.props.checkAuthStatus(token)
        }else{
            this.props.force_noAuthStatus()
        }

    }

    render() {
        return (
            <div className={classNames({'container': true, 'site_loaded': this.state.site_loaded})}>
                <div className="main">
                    <Header />
                    <RoutesHelper {...this.props} authed={this.props.authStatus} authPath='/login' />
                </div>
                <Footer />
            </div>
        );  
    }

};

const mapStateToProps = (state) => ({
    authStatus: state.authStatus.status
});

export default {
    component: connect(mapStateToProps, {getAuthStatus, checkAuthStatus, force_noAuthStatus})(withRouter(Main)),
    loadData: ({dispatch}) => dispatch(getAuthStatus())
};