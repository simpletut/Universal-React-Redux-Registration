import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Logo from './../../../assets/graphics/logo.png';

class Header extends Component {

    render() {

        return (
            <header className="auth">
                <div className="logo">
                    <Link to="/">
                        <img src={Logo} />
                    </Link>
                </div>
            </header>
        );
    }

};

export default Header;