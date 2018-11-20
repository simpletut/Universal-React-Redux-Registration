import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Logo from './../../assets/graphics/logo.png';

class Header extends Component {

    render() {

        return (
            <header className="mainHeader">
                <div className="logo">
                    <Link to="/dashboard">
                        <img src={Logo} />
                    </Link>
                </div>
                <nav className="nav">
                    <ul>
                        <li className="first">
                            <Link to="/account">
                                Account
                            </Link>        
                        </li>
                        <li>
                            <Link to="/users/1">
                                Users
                            </Link>
                        </li>
                        <li className="last">
                            <Link to="/logout">
                                LogOut
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }

};

export default Header;