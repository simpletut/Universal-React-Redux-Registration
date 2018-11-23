import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from './../actions';
import Pagination from "react-js-pagination";
import { Helmet } from 'react-helmet';
import { Redirect, withRouter } from 'react-router-dom';

class Users extends Component {

    head() {
        return (
            <Helmet>
                <body className="notFoundPage" />
                <title>Users - React Starter Kit</title>
            </Helmet>
        );
    }
    componentDidMount() {
        const pageNumber = this.props.match.params.pageNumber;
        this.props.getUsers(pageNumber);
    }
    handlePageChange(num) {
        this.props.history.push(`/users/${num}`);
        this.props.getUsers(num);
    }

    render() {

        const { page, totalPages, totalResults, results, resultsPerPage } = this.props.users;

        if (page) {
            return (
                <div className="grid usersPage">
                    {this.head()}

                    <div className="headline column column_12_12">
                        <h1>
                            Users
                        </h1>

                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </div>


                    <div className="results_info">
                        <p>
                            Page {page} of {totalPages}
                        </p>
                        <p>
                            {totalResults} results
                        </p>
                    </div>


                    <div className="usersWrap">
                        {results.map((user, index) => (
                            <div className="column column_4_12" key={index}>
                                <div className="user">
                                    <div className="wrap">
                                        <div className="profileImage">
                                            <img src="http://git-assets.react-starter-kit.com/texture.jpg" alt="" />
                                        </div>
                                        <div className="title">
                                            <span>
                                                {user.fName} {user.lName}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="paginationWrap">
                        <Pagination
                            itemsCountPerPage={resultsPerPage}
                            totalItemsCount={totalResults}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>


                </div>
            )
        }

        return <Redirect to="/users/1" />
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

function loadData(store, pageNumber) {
    return store.dispatch(getUsers(pageNumber));
}

export default {
    component: withRouter(connect(mapStateToProps, { getUsers })(Users)),
    loadData
}